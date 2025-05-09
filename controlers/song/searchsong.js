import { Song } from "../../models/song/songmodle.js";
import Videosong from "../../models/videosong/videosong.js";
const songBySearchingControllar = async (req, res) => {
  try {
    // Extract the search query from request parameters
    const { query } = req.query;

    console.log(query);
    // Validate the query
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Use Mongoose to find songs where title or description matches the query

    const searchResults = await Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, //
        { description: { $regex: query, $options: "i" } },
        { mood: { $regex: query, $options: "i" } },
        {
          songCategory: { $regex: query, $options: "i" },
        },
        {
          artist: { $regex: query, $options: "i" },
        },
      ],
    }).sort({ title: 1, description: 1, artist: 1, mood: 1, songCategory: 1 });

    
    if (searchResults.length === 0) {
      const searchResultsVideo = await Videosong.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, //
          { description: { $regex: query, $options: "i" } },
          { mood: { $regex: query, $options: "i" } },
          {
            songCategory: { $regex: query, $options: "i" },
          },
          {
            artist: { $regex: query, $options: "i" },
          },
        ],
      }).sort({
        title: 1,
        description: 1,
        artist: 1,
        mood: 1,
        songCategory: 1,
      });

      if (searchResultsVideo.length === 0) {
        return res.status(404).json({
          message: "No results found",
        });
      }else{
        return res.status(200).json(searchResultsVideo);
      }
    } else {
      return res.status(200).json(searchResults);
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export default songBySearchingControllar;
