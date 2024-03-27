from mongoengine import Document, StringField, ListField, IntField, EmbeddedDocument, EmbeddedDocumentField
from typing import Optional
from pydantic import BaseModel


#the schema is designed to register a new user with this names
class NewUser(BaseModel):
    username: str
    password: str
    questions: Optional[list] = None
    total_points: Optional[int] = 0
    warnings: Optional[int] = 0


#list of questions in the user document wich user has attempted weather it is wrong or right
class Question(EmbeddedDocument):
    question = StringField()
    answer = StringField()
    correct_answer = StringField()
    time_taken = IntField()
    points = IntField()

#the User class is used to manipulate the data of the user in the database
class User(Document):
    username = StringField(unique=True)
    password = StringField()
    questions = ListField(EmbeddedDocumentField(Question)) #questions has a list of questions
    total_points = IntField()
    warnings = IntField()

#used to retrive questions 
class questions(Document):
    question = StringField()
    options = ListField()
    answer = StringField()
    explanation = StringField()    

#add the users answer for a question in users collection
class AddQuestionRequest(BaseModel):
    question: str
    answer: str
    time_seconds: Optional[int] = 15
    points: int
    correct_answer: str