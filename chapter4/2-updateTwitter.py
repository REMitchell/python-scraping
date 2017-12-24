from twitter import Twitter, OAuth

#Make sure to add the access tokens and consumer keys for your application
t = Twitter(auth=OAuth("Access Token","Access Token Secret","Consumer Key","Consumer Secret"))
statusUpdate = t.statuses.update(status='Hello, world!')
print(statusUpdate)