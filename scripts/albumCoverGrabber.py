import requests
import urllib.request
import json

bad_chars = ['<','>',':','\"','/','\\','|','?','*']

def getValidFileName(s):
    return ''.join((filter(lambda c: c not in bad_chars, s)))

apiKey = 'c5be1569744291e7b9a825988daec85e'
baseURL = ' http://ws.audioscrobbler.com/2.0/'
method = 'album.getinfo'
fmt = 'json'

params = {
    'method': method,
    'api_key': apiKey,
    'format': fmt
}

baseFilePath = 'C:/Users/user/Documents/GitHub/ErnieVinylScavengerHunt'
albums = []
with open('../data/albumBackLog.json', 'r') as f:
    albums = json.loads(f.read())

missingImages = 'MISSING IMAGES:\n'

for album in albums:
    params['artist'] = album["Artist"] #+ 'asdfsag'
    params['album'] = album["Title"]

    if 'called' in album.keys():
        continue

    albumData = requests.get(url=baseURL, params=params).json()

    if 'error' in albumData.keys() or albumData['album']['image'][2]['#text'] == '':
        missingImages += album['Title'] + ' - ' + album['Artist'] + '\n'
    else:
        validTitle = getValidFileName(album['Title'])
        validArtist = getValidFileName(album['Artist'])

        filePathExt = '/images/{artist}-{album}.jpg'.format(artist=validArtist, album=validTitle)

        try:
            f = open(baseFilePath + filePathExt, 'r')
            f.close()
        except:
            urllib.request.urlretrieve(albumData['album']['image'][2]['#text'], baseFilePath + filePathExt)
            album['called'] = True

with open('missing_images.txt', 'w+') as f:
    f.write(missingImages)

with open('../data/albumBackLog.json', 'w') as f:
    f.write(json.dumps(albums))