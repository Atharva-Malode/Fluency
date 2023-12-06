from mongoengine import Document, StringField, ListField, IntField, EmbeddedDocument, EmbeddedDocumentField
from typing import Optional
from pydantic import BaseModel

#list of questionsin the user document wich user has attempted weather it is wrong or right
class Question(EmbeddedDocument):
    question = StringField()
    answer = StringField()
    time_taken = StringField()
    points = IntField()

#the User class is used to manipulate the data of the user in the database
class User(Document):
    username = StringField(unique=True)
    password = StringField()
    questions = ListField(EmbeddedDocumentField(Question)) #questions has a list of questions
    total_points = IntField()
    language = ListField()

# class User(Document):
#     username = StringField(unique=True)
#     password = StringField()

#request data for adding a new user  : used in sign up
class NewUser(BaseModel):
    username: str
    password: str
    questions: Optional[list] = None
    total_points: Optional[int] = 0
    language: Optional[list] = None

#used to retrive questions 
class test(Document):
    no = IntField()
    language = StringField()
    questions = ListField()    

#request data for adding a new question : used in add_question
class QuestionRequest(BaseModel):
    question_no: int
    old_answer: bool 
    old_level: str
    language: str

#add the users answer for a question in users collection
class AddQuestionRequest(BaseModel):
    question: str
    answer: str
    time_seconds: Optional[str] = "15 seconds"
    excercise_no : Optional[int] = 1
    points: int