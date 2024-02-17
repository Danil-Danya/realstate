const axios = require('axios');

class reviws {
    async getReviews (req, res) {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.PLACE_ID}&fields=name,rating,reviews&key=${process.env.GOOGLE_API_KEY}`
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const reviewsData = response.data.result.reviews;
        return res.status(200).json(reviewsData);
    }
}

module.exports = new reviws();