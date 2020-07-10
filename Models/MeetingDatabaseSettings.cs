namespace FinalProject.Models
{
    public class MeetingDatabaseSettings : IMeetingDatabaseSettings
    {
        public string MeetingCollectionName { get; set; }
        public string SubjectCollectionName { get; set; }
        public string HymnCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IMeetingDatabaseSettings
    {
        string MeetingCollectionName { get; set; }
        public string SubjectCollectionName { get; set; }
        public string HymnCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}