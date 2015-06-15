import urllib2
import socks
import socket

socks.set_default_proxy(socks.SOCKS5, "127.0.0.1", 9150)
socket.socket = socks.socksocket
print(urllib2.urlopen('http://icanhazip.com').read())