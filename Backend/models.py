from mongoengine import Document, StringField, ListField, IntField, EmbeddedDocument, EmbeddedDocumentField
from typing import Optional
from pydantic import BaseModel


class Question(EmbeddedDocument):
    question = StringField()
    answer = StringField()
    time_taken = StringField()
    points = IntField()

class User(Document):
    username = StringField(unique=True)
    password = StringField()
    questions = ListField(EmbeddedDocumentField(Question))
    total_points = IntField()
    language = ListField()

# class User(Document):
#     username = StringField(unique=True)
#     password = StringField()

class NewUser(BaseModel):
    username: str
    password: str
    questions: Optional[list] = None
    total_points: Optional[int] = 0
    language: Optional[list] = None

class test(Document):
    no = IntField()
    language = StringField()
    questions = ListField()

