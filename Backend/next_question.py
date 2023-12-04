from models import test
def next_question(old_level : str,no : int,old_answer : bool):   
    if old_level == "easy":
        if old_answer == True:
            no = 11 + no
            return test.objects.get(no=1).questions[no]
        else:
            no = 1 + no
            return test.objects.get(no=1).questions[no]
        
    elif old_level == "medium":
        if old_answer == True:
            no = 21 + no
            return test.objects.get(no=1).questions[no]
        else:
            no = 1 + no
            return test.objects.get(no=1).questions[no]
        
    elif old_level == "hard":
        if old_answer == True:
            no = 21 + no
            return test.objects.get(no=1).questions[no]
        else:
            no = 11 + no
            return test.objects.get(no=1).questions[no]