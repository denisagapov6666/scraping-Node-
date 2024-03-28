const axios = require('axios');
const { checkUrl } = require("../MainCheckUrls");
const site = "rebel";
module.exports = async () => {
    console.log("Get Urls:");
    try {
        // Fetch URLs from the homepage
        const url = "https://www.rebelcarpets.com/pro-gallery-webapp/v1/galleries/1c1a8969-d8b2-4986-985a-23f61025b604?externalId=654e06a6-897c-450d-949f-d8a634b29636&state=PUBLISHED&lang="

        const headers = {
            "Authorization": "A6r-WP-wPmJQ9PGYIAz2Jdbnvmq7fIYN5_69wOsXwpA.eyJpbnN0YW5jZUlkIjoiZDc0MzMzNWMtYjVmNi00YTUwLWFhMWItNGRiMzAxZDhjMzhkIiwiYXBwRGVmSWQiOiIxNDI3MWQ2Zi1iYTYyLWQwNDUtNTQ5Yi1hYjk3MmFlMWY3MGUiLCJtZXRhU2l0ZUlkIjoiNWVlYTM5NjktYjEzOS00NDA3LTlhMjMtMDc0NGU0NmE1MjNhIiwic2lnbkRhdGUiOiIyMDI0LTAzLTI4VDAwOjQzOjM3LjcxOFoiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiJmYTE4NTA0Yi0yMTBlLTQyZjctOWYxYi0zYjFjZDQ4OTlhMGIiLCJhaWQiOiI1MmJlMGIxYy05MDg5LTRlNjAtYjkyNS01Y2I5MGQ5ZGQ5MDAiLCJiaVRva2VuIjoiODlhOTBhMzUtMDRjZi0wZTU3LTMwMzgtNGFmN2U1YjI5MWI3Iiwic2l0ZU93bmVySWQiOiIyMTMzYTNlMy03MmY0LTQ4OGQtYjYwYy1hNmRhZjE1MjQ1NDcifQ"
        }

        const response = await axios.get(url, {headers});
        const items = response.data.gallery.items

        const urls = []
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const collectionUrl = items[i].link.url;
                urls.push(collectionUrl);
            }
        }
        const data = await checkUrl(site, urls);
        return data;
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }
    console.log("End getting Urls:**")
};

