var browser         = bowser.name.toLowerCase();
var templateButton  = document.getElementById('button-template').innerHTML;
var templatePost    = document.getElementById('post-template').innerHTML;

var urls = {
    'firefox': 'https://addons.mozilla.org/firefox/downloads/file/375265/like_i_give_a_fuck-1.0.8-fx.xpi?src=ss',
    'chrome': 'https://chrome.google.com/webstore/detail/like-i-give-a-f/ohfpnpgiljfbmnibfpoieckbmhaagogf'
};

if (browser && (browser === 'firefox' || browser === 'chrome')) {
    var downloadButton = Mustache.render(templateButton, { browser: browser, url: urls[browser] });
    document.getElementById('download-button').innerHTML = downloadButton;
}

axios.all([
    axios.get('https://randomuser.me/api/'),
    axios.get('http://hipsterjesus.com/api?html=false&paras=1')
]).then(axios.spread(function (userData, textData) {
    var user         = userData.data.results[0].user;
    var templateData =
    {
        author     :  user.name.first + ' ' + user.name.last,
        picture    :  user.picture.thumbnail,
        location   :  user.location.city,
        content    :  textData.data.text,
        liked      :  Math.random() >= 0.5,
        timestamp  :  Math.floor((Math.random() * 50) + 1) + ' mins',
        likes      :  Math.floor((Math.random() * 1000) + 1),
        comments   :  Math.floor((Math.random() * 1000) + 1),
        shares     :  Math.floor((Math.random() * 1000) + 1)
    };

    var postExample = Mustache.render(templatePost, templateData);
    document.getElementById('post-example').innerHTML = postExample;
}));