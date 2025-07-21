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

document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById("post-container");

    // Attach to all <a> links inside #post-container
    postContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent full-page reload
            const url = new URL(link.href);

            const year = url.searchParams.get('year');
            const month = url.searchParams.get('month');
            const postNum = url.hash.substring(1); // Remove the # from "#1" 

            const data = await getPostData(`${year}-${month}`, postNum); // Fetch and load the post
            const backLink = '<div class="back-link"><p><a href="blog.html">← Back to blog</a></p></div>';
            postContainer.innerHTML = data + backLink;
        });
    });
});