from nltk import word_tokenize, sent_tokenize, pos_tag
sentences = sent_tokenize("Google is one of the best companies in the world. I constantly google myself to see what I'm up to.")
nouns = ['NN', 'NNS', 'NNP', 'NNPS']

for sentence in sentences: 
    if "google" in sentence.lower(): 
        taggedWords = pos_tag(word_tokenize(sentence)) 
        for word in taggedWords: 
            if word[0].lower() == "google" and word[1] in nouns: 
                print(sentence)
