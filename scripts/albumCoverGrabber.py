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
with open('../data/albumBackLog.json', 'r', encoding='utf-8') as f:
    albums = json.load(f)

missingImages = 'MISSING IMAGES:\n'

for album in albums:

    validTitle = getValidFileName(album['Title'])
    validArtist = getValidFileName(album['Artist'])

    filePathExt = '/images/{artist}-{album}.jpg'.format(artist=validArtist, album=validTitle)
    print(filePathExt)

    try:
        f = open(baseFilePath + filePathExt, 'r')
        f.close()
        if not album['Called']:
            album['Called'] = True
    except:
        if album['Called']:
            continue

        params['artist'] = album["Artist"] #+ 'asdfsag'
        params['album'] = album["Title"]

        albumData = requests.get(url=baseURL, params=params).json()

        if 'error' in albumData.keys() or albumData['album']['image'][2]['#text'] == '':
            missingImages += album['Title'] + ' - ' + album['Artist'] + '\n'
        else:
            urllib.request.urlretrieve(albumData['album']['image'][2]['#text'], baseFilePath + filePathExt)
            album['Called'] = True

        
        

with open('missing_images.txt', 'w') as f:
    f.write(missingImages)

with open('../data/albumBackLog.json', 'w', encoding='utf-8') as f:
    json.dump(albums, f, ensure_ascii=False, indent=4)