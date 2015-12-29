from twitter import Twitter, OAuth

#Make sure to add the access tokens and consumer keys for your application
t = Twitter(auth=OAuth("Access Token","Access Token Secret","Consumer Key","Consumer Secret"))
pythonStatuses = t.statuses.user_timeline(screen_name="montypython", count=5)
print(pythonStatuses)
