import _thread
import time

def print_time(threadName, delay, iterations):
    start = int(time.time())
    for i in range(0,iterations):
        time.sleep(delay)
        seconds_elapsed = str(int(time.time()) - start)
        print (threadName if threadName else seconds_elapsed)

try:
    _thread.start_new_thread(print_time, (None, 1, 100))
    _thread.start_new_thread(print_time, ("Fizz", 3, 33))
    _thread.start_new_thread(print_time, ("Buzz", 5, 20))
except:
    print ("Error: unable to start thread")

while 1:
    pass