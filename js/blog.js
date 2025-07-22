async function getPostData(logName, postNum) {
    const postPath = `./posts/${logName}.html`;
    const response = await fetch(postPath);
    const html = await response.text(); // Full log, string type
    
    // querySelector only works on DOM elements, not strings
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const postElement = tempDiv.querySelector(`#post-${postNum}`);
    if (!postElement) {
        return `<p>Post ${postNum} not found in ${logName}.</p>`
    }
    return postElement.outerHTML; // include tags
}

async function getPostInfo(logName, postNum) {
    const postPath = `./posts/${logName}.html`;
    const response = await fetch(postPath);
    const html = await response.text(); // Full log, string type
    
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const postElement = tempDiv.querySelector(`#post-${postNum}`);
    if (!postElement) {
        return `<p>Post ${postNum} not found in ${logName}.</p>`
    }

    const postTitle = postElement.querySelector('.post-title');
    const postDate = postElement.querySelector('.post-date');

    return [postTitle, postDate];
}

document.addEventListener('DOMContentLoaded', () => {
    (async () => {
        // Fetch and display blog title and date
        const postContainer = document.getElementById("post-container");
        const links = postContainer.querySelectorAll('a');
        for (const link of links) {
            const url = new URL(link.href);
            const year = url.searchParams.get('year');
            const month = url.searchParams.get('month');
            const postNum = url.hash.substring(1);
            const postInfo = await getPostInfo(`${year}-${month}`, postNum);
            if (postInfo) {
                link.textContent = `${postInfo.postDate}: ${postInfo.postTitle};`
            }
        }
    }); 
});
    

document.addEventListener('DOMContentLoaded', () => {
    // Attach click event listener to all <a> links inside #post-container
    const postContainer = document.getElementById("post-container");
    const links = postContainer.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent full-page reload
            const url = new URL(link.href);

            const year = url.searchParams.get('year');
            const month = url.searchParams.get('month');
            const postNum = url.hash.substring(1); // Remove the # from "#1" 

            const data = await getPostData(`${year}-${month}`, postNum); // Fetch and load the post
            const backLink = '<div class="back-link"><p><a href="blog.html">← Back</a></p></div>';
            postContainer.innerHTML = data + backLink;
        });
    });
});

