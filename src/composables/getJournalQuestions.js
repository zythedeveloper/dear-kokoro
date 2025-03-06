const questions=["Whom do you admire the most? What is the reason for your admiration?",
"Define happiness from your perspective.","What fears are preventing you from living your fullest life?",
"If you could offer advice to your younger self, what wisdom would you impart?","Compile a list of things that bring a smile to your face.","How do you cope with feelings of anger?",
"What activities or interests cause you to lose track of time?"," What lifts your spirits on a difficult day?","What changes do you anticipate in your life five years from now?",
"What is your most significant insecurity, and what might life be like if you released it?","What’s your favorite self-care activity?","What makes you feel calm?","Which aspects of your everyday life contribute to stress, frustration, or sadness, and how can you modify or improve those circumstances? ",
"What are your favorite hobbies? Why? ","How do you make self-care a priority in your life?","Please share two or three relaxation techniques or activities you engage in.","What's your approach to self-forgiveness when you've made an error?",
"What is something you’ve always wanted to do?"

]

// Function to select a random question
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
  
export default getRandomQuestion;