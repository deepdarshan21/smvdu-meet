var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

const question_words = ["what" , "why" , "when" , "where" , "who" , "can", "explain" , "name" , "is" , "how" , "do" , "does" , "which " , "are" , "could" , "would" , "should" , "has" , "have" , "whom" , "whose" , "don't"];

export const questionCheck = (message) => {
    console.log("kv");
    message = message.toLowerCase();
    let question = tokenizer.tokenize(message);

    question_words.forEach(questionWord => {
        if(questionWord === question[0] && question.length > 1){
            message = "question1 "+ message;
        }
    });
    console.log(message);
    return message;

}
