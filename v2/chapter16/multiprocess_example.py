from multiprocessing import Process
import time

def print_time(threadName, delay, iterations):
    start = int(time.time())
    for i in range(0,iterations):
        time.sleep(delay)
        seconds_elapsed = str(int(time.time()) - start)
        print (threadName if threadName else seconds_elapsed)


processes = []
processes.append(Process(target=print_time, args=(None, 1, 100)))
processes.append(Process(target=print_time, args=("Fizz", 3, 33)))
processes.append(Process(target=print_time, args=("Buzz", 5, 20)))

for p in processes:
    p.start()

for p in processes:
    p.join()
    
print("Program complete")