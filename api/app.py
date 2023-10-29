from flask import Flask, request, jsonify
import pymongo 
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
# app.config["MONGO_URI"] = "mongodb+srv://admin:admin@cluster1.nqvqztn.mongodb.net/portfolio_ext?retryWrites=true&w=majority"
myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster1.nqvqztn.mongodb.net/?retryWrites=true&w=majority")
db = myclient["portfolio_ext"]

@app.route('/user/create', methods=['POST'])
def user_create():
    try:
        data = request.get_json()
        result = db.user.insert_one(data)
        return jsonify(message="Record inserted.", id=str(result.inserted_id)), 201
    except Exception as e:
        return jsonify(message="An error occurred: " + str(e)), 500
    
## User Login
@app.route('/user/login', methods=['POST'])
def user_login():
    try:
        data = request.get_json()
        result = db.user.find_one({
            "email": data['email'],
            "password": data['password']
        })
        if result is None:
            return jsonify(message="Invalid credentials."), 401
        else:
            return jsonify(message="Login Successful.", id=str(result["_id"])), 200
    except Exception as e:
        return jsonify(message="An error occurred: " + str(e)), 500

@app.route('/user/info', methods=['GET'])
def user_info():
    try:
        user_id = request.args.get('id')
        result = db.user.find_one({"_id": ObjectId(user_id)})
        print(result)   
        if result is None:
            return jsonify(message="User not found."), 404
        else:
            result.pop('password', None)
            result.pop('_id', None)
            return jsonify(result), 200
    except Exception as e:
        return jsonify(message="An error occurred: " + str(e)), 500





@app.route('/portfolio', methods=['POST'])
def create_or_update_portfolio():
    try:
        data = request.get_json()
        user_id = data['id']
        portfolio_data = data['data']

        # Fetch user info from the database
        user_info = db.user.find_one({"_id": ObjectId(user_id)})
        if user_info is None:
            return jsonify(message="User not found."), 404

        # Prepare the portfolio document
        portfolio_doc = {
            "user_id": str(user_info["_id"]),
            "name": user_info["name"],
            "email": user_info["email"],
            "data": portfolio_data
        }

        # Update the portfolio document if it exists, otherwise insert it
        result = db.portfolio.update_one(
            {"user_id": user_id},
            {"$set": portfolio_doc},
            upsert=True
        )

        if result.upserted_id is not None:
            return jsonify(message="Portfolio created."), 201
        else:
            return jsonify(message="Portfolio updated."), 200
    except Exception as e:
        return jsonify(message="An error occurred: " + str(e)), 500


@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    try:
        user_id = request.args.get('id')

        # Fetch portfolio info from the database
        portfolio_info = db.portfolio.find_one({"user_id": user_id})
        if portfolio_info is None:
            return jsonify(message="Portfolio not found."), 404

        portfolio_info.pop('_id', None)
        return jsonify(portfolio_info), 200
    except Exception as e:
        return jsonify(message="An error occurred: " + str(e)), 500


@app.route('/portfolio', methods=['DELETE'])
def delete_portfolio():
    try:
        user_id = request.args.get('id')

        result = db.portfolio.delete_one({"user_id": user_id})
        if result.deleted_count == 0:
            return jsonify(message="No portfolio found to delete."), 404

        return jsonify(message="Portfolio deleted."), 200
    except Exception as e:
        return jsonify(message="An error occurred: " + str(e)), 500










@app.route('/read', methods=['GET'])
def read():
    data = mongo.db.collection.find()
    return jsonify([x for x in data]), 200

@app.route('/update/<id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    mongo.db.collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify(message="Record updated."), 200

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    mongo.db.collection.delete_one({"_id": ObjectId(id)})
    return jsonify(message="Record deleted."), 200

if __name__ == "__main__":
    app.run(debug=True)
