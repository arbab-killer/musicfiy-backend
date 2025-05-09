import { Song } from "../../models/song/songmodle.js";

const top_artiestsControllar = async (req, res) => {
  try {
    // Use aggregation pipeline to group songs by artist and sum their views
    const popularArtists = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          totalViews: { $sum: "$views" },
          songs: { $push: "$$ROOT" },
        },
      },
      { $sort: { totalViews: -1 } }, // Sort artists by total views in descending order
    ]);

    // Send the sorted artists as the response
    res.status(200).json(popularArtists);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Server Error", error });
  }
};
export default top_artiestsControllar;
