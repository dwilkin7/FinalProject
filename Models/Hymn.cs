using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FinalProject.Models
{
    public class Hymn
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Hymn Title")]
        public string SongTitle { get; set; }

        [BsonElement("Hymn Number")]
        public int HymnNumber { get; set; }
    }
}