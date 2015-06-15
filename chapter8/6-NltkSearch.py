from nltk.book import *
from nltk import ngrams
fourgrams = ngrams(text6, 4)
for fourgram in fourgrams: 
    if fourgram[0] == "coconut": 
        print(fourgram)