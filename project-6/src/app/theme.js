const theme = {
    html: document.querySelector('html'),
    themeSwitch: document.querySelector('.user__header__theme__container'),  
    osTheme: null,
};


function autoDetect() {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        theme.osTheme = 'light';
        theme.html.setAttribute('data-theme', 'light');
    } else {
        theme.osTheme = 'dark';
        theme.html.setAttribute('data-theme', 'dark');
    }
}

autoDetect();

window.addEventListener('load', () => {
    const arr = {1:'Page Loaded...', 2:'OS Theme Detection'};
    const arrTab = [];
    
    for (const key in arr) {
        switch (key) {
            case '1':
                arrTab[0] = {status: 'Page Loaded...', success: true};
                break; 
            
            case '2':
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                
                if (!isDark && !isLight) {
                    console.error("Error: No OS theme preference detected");
                    arrTab[1] = {status: 'OS Theme Detection', success: false};
                } else {
                    arrTab[1] = { 
                        status: 'OS Theme Detection',
                        success: true,
                        theme: isDark ? 'dark' : 'light'
                    };
                }
                break;
        }
    }
    console.groupCollapsed('Load & Auto Theme');
    console.table(arrTab);
    console.groupEnd();
});

theme.themeSwitch.addEventListener('click', () => {
    if (theme.html.getAttribute('data-theme') == 'light') {
        theme.html.setAttribute('data-theme', 'dark');
        theme.osTheme = 'dark';
    } else {
        theme.html.setAttribute('data-theme', 'light');
        theme.osTheme = 'light';
    }

    let arr = [
        {'manual theme': 'true'},
        {'current theme': theme.osTheme}
    ];
    console.groupCollapsed('Manual Theme Override');
    console.table(arr);
    console.groupEnd();
});


// search container area
const search = {
    searchInput : document.querySelector('#search__container__search-user'),
    resultsNote: document.querySelector('#results'),
    searchBtn : document.querySelector('#search-profile'),

    // user
    avatar: document.querySelector('#profile-img'),
    displayName : document.querySelector('.profile__info__display-name'),
    userName : document.querySelector('.profile__info__user-name #username'),
    joinDate : document.querySelector('.profile__info__join-date #join-date'),
    userBio : document.querySelector('#biography.profile__bio'),
    repoCount : document.querySelector('#repo-count'),
    followersCount : document.querySelector('#followers-count'),
    followingCount : document.querySelector('#following-count'),

    // links
    location: document.querySelector('#location'),
    github: document.querySelector('#github-link'),
    twitter: document.querySelector('#x-link'),
    company: document.querySelector('#company-link'),
}

search.searchInput.addEventListener('click', () => {
    if (search.searchInput.value.trim() != "") {
        search.searchInput.value = "";
        console.info('search field emptied.');
    } else {
        console.info('search field is empty.');
    }
});

search.searchInput.addEventListener('blur', () => {
    if (search.searchInput.value.trim() == '') {
        search.searchInput.value = 'Search GitHub username…';
    }
});

// github GET request

search.searchBtn.addEventListener('click', () => {
    async function fetchUser() {
        try {
            const response = await fetch(`https://api.github.com/users/${search.searchInput.value.trim()}`);
            
            if (!response.ok) { 
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            if (window.innerWidth >= 1200) {
                search.resultsNote.style.display = 'var(--display-initial)';
            } else {
                search.resultsNote.style.display = 'none';
                alert('Sorry, no results found.');
            }
            console.error('Error fetching data:', error);
        }
    }

    //format date to GB standard
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');  // "14" → "14", "5" → "05"
        const month = String(date.getMonth() + 1).padStart(2, '0');  // June → "06" (months are 0-11)
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;  // "14/06/2021"
    }

    fetchUser().then(data => {
        if (data) {
            
            search.avatar.src = data.avatar_url;
            search.displayName.textContent = data.name;
            search.userName.textContent = data.login;
            search.joinDate.textContent = formatDate(data.created_at);
            search.userBio.textContent = data.bio;
            
            search.repoCount.textContent = data.public_repos || 0;
            if (search.repoCount.textContent == 0) {
                search.location.setAttribute('class', 'non-valid');
            }

            search.followersCount.textContent = data.followers;
            search.followingCount.textContent = data.following;

            search.location.textContent = data.location || 'Not Available';
            if (search.location.textContent == 'Not Available') {
                search.location.setAttribute('class', 'non-valid');
            }

            search.github.textContent = data.html_url;
            if (data.html_url) {
                search.github.setAttribute('href', data.html_url);
            } else {
                search.github.textContent.setAttribute('class', 'non-valid');
            }

            search.twitter.textContent = data.twitter_username || 'Not Available';
            if (search.twitter.textContent == 'Not Available') {
                search.twitter.setAttribute('class', 'non-valid');
            }

            search.company.textContent = data.company || 'Not Available';
            if (search.company.textContent == 'Not Available') {
                search.company.setAttribute('class', 'non-valid');
            }

            console.table(
                {
                    'avatar': search.avatar.src,
                    'display_name': search.displayName.textContent,
                    'user_name': search.userName.textContent,
                    'join_date': search.joinDate.textContent,
                    'user_bio': search.userBio.textContent,
                    'repo_count': search.repoCount.textContent,
                    'followers_count': search.followersCount.textContent,
                    'following_count': search.followingCount.textContent,
                    'location': search.location.textContent,
                    'github_link': search.github.textContent,
                    'twitter': search.twitter.textContent,
                    'company': search.company.textContent
                }
            );
        }
    })
});