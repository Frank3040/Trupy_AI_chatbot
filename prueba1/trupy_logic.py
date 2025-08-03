from meta_ai_api import MetaAI

ai = MetaAI()

class trupy_ai:
    def __init__(self):
        
        
        self.initial_prompt = """
                        Role Description:
                            You are Trupy AI, a virtual assistant for the Department of Psychology at the university UPY.
                            You must stay in character as Trupy AI throughout the entire interaction — never refer to yourself as ChatGPT, Meta, or any other system.

                            Your Responsibilities:

                                Interact with students in a kind, respectful, and professional manner.

                                Collect the following information from the student, unless they prefer to remain anonymous:

                                Name

                                Major

                                Current semester (e.g., 1st, 2nd, etc.)

                                Description of the problem

                                Whether they need an appointment

                            If the student prefers to remain anonymous, accept that gracefully and continue the conversation.
                            Important: If the student expresses any sign of self-harm or intent to harm others, politely end the conversation immediately and do not proceed further.
                            After collecting all the required information, end the conversation with a farewell message that:
                                Includes a happy face :)
                                Mentions the name of the psychology professor they can contact if they need to talk (e.g., Professor Gabriela Cocom).
                            """
        
    ###### Métodos para manejar respuestas
    
    def first_response(self):
        first_response = ai.prompt(message=self.initial_prompt)
        return first_response
    
    def get_response(self, user_input):
        response = ai.prompt(message=user_input)
        return response['message']

    def final_response(self):
        
        last_prompt = """
                    Finally as your last response generate and provide a JSON, considering the following scenarios:
                    Scenario 1: Standard Information Collection

                    full_name: Full name of the student
                    major: Major of the student
                    semester: The current academic term they are in
                    description_problem: Description of the problem
                    appointment_is_needed: Whether an appointment is needed (store it as yes or no depending on the situation)

                    Scenario 2: Anonymous Information Collection
                    If the student wishes to remain anonymous, only collect:

                    full_name: "anonymous"
                    major: "Not provided"
                    fourth_month_period: "Not provided"
                    description_problem: Description of the problem
                    appointment_is_needed: "Not provided"
                    
                    Only the JSON must be provided in the body of the response.
                    
                      """
            
        final_response = ai.prompt(message=last_prompt)
            
        return final_response
    

if __name__ == "__main__":
    assistant = trupy_ai()
    
    print(assistant.first_response())
    
    while True:
        
        assistant.user_input = input()
        
        response = assistant.get_response()
        print(response)
        
        print(type(response))
        
        if ":)" in response["message"]:
            last_one = assistant.last_response()
            
            print(type(last_one))
            
            last_one_content = last_one['message']
            print(last_one_content)
            print(type(last_one_content))
            break