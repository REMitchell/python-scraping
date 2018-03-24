import threading
import time

def print_time(threadName, delay, iterations):
    start = int(time.time())
    for i in range(0,iterations):
        time.sleep(delay)
        seconds_elapsed = str(int(time.time()) - start)
        print ('{} {}'.format(seconds_elapsed, threadName))

t = threading.Thread(target=print_time, args=('Fizz', 3, 33)).start()
t = threading.Thread(target=print_time, args=('Buzz', 5, 20)).start()
t = threading.Thread(target=print_time, args=('Counter', 1, 100)).start()

