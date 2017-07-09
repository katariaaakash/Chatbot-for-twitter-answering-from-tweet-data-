from __future__ import absolute_import
from __future__ import print_function
import six
import _json
__auther__='a_medelyan'
import rake
import operator
import io
stop_path="SmartStoplist.txt"
rake_obj=rake.Rake(stop_path,3,3,1)
f=open('Keywords.txt','r')
text = f.read()
f.close()
keywords=rake_obj.run(text)
f=open('Keywords.txt','w')
f.write("{\"keywords\":[")
t = len(keywords)
l = 0
for key in keywords:
    l = l+1
    f.write("{\"keys\":\"" + key[0] + "\"," + "\"rank\":\"" + str(key[1]) + "\"}")
    if l != t:
        f.write(",")
f.write("]}")
f.close()
#+ "\:\"" + key[0] + "\"" + " " + str(key[1]) + "\n")