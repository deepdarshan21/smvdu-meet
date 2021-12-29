var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

const abusive_words = ["fuck" , "shit" , "motherfucker" , "bc" , "mc" ];

export const abuseCheck = (message) => {
    message = message.toLowerCase();
    let abuse = tokenizer.tokenize(message);
    
    abusive_words.forEach(abusiveWord => {
        if(abusiveWord === abuse[0] ){
            message = "Abused1";
        }
    });

    return message;

}
