using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FinalProject.Models
{
    public class Subject
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Subject")]
        public string SubjectName { get; set; }
    }
}