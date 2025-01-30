import express from "express";
import NewsAPI from "newsapi";

const router = express.Router();

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

router.get("/news", async (req, res) => {
    try {
        const response = await newsapi.v2.everything({
            q: "news",
        });

        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

export default router;
