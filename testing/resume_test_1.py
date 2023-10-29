from pyresparser import ResumeParser
import os
data = ResumeParser(f"{os.getcwd()}/Abhisht_Resume.pdf").get_extracted_data()

print(data)