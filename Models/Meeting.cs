using Microsoft.VisualBasic.CompilerServices;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    public class Meeting
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        //[BsonElement("Conducting")]
        public string Conductor { get; set; }


        //[BsonElement("Opening Prayer")]
        public string OpeningPrayer { get; set; }


        //[BsonElement("Closing Prayer")]
        public string ClosingPrayer { get; set; }

        //public Array Speakers { get; set; }
        public string[] Speakers { get; set; }
        public DateTime MeetingDate { get; set; }

        //[BsonElement("Topic")]
        public string[] Topic { get; set; }


        //[BsonElement("Opening Hymn")]
        public string OpeningHymn { get; set; }


        //[BsonElement("Sacrament Hymn")]
        public string SacramentHymn { get; set; }


        //[BsonElement("Closing Hymn")]
        public string ClosingHymn { get; set; }


        //[BsonElement("Intermediate Hymn")]
        public string IntermediateHymn { get; set; }
    }
}