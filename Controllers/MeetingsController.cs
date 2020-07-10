using FinalProject.Models;
using FinalProject.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingsController : ControllerBase
    {
        private readonly MeetingService _meetingService;

        public MeetingsController(MeetingService meetingService)
        {
            _meetingService = meetingService;
        }

        [HttpGet]
        public ActionResult<List<Meeting>> Get() =>
            _meetingService.Get();

        [HttpGet("{id:length(24)}", Name = "GetMeeting")]
        public ActionResult<Meeting> Get(string id)
        {
            var meeting = _meetingService.Get(id);

            if (meeting == null)
            {
                return NotFound();
            }

            return meeting;
        }

        [HttpPost]
        public ActionResult<Meeting> Create(Meeting meeting)
        {
            _meetingService.Create(meeting);

            return CreatedAtRoute("GetMeeting", new { id = meeting.Id.ToString() }, meeting);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Meeting meetingIn)
        {
            var meeting = _meetingService.Get(id);

            if (meeting == null)
            {
                return NotFound();
            }

            _meetingService.Update(id, meetingIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var meeting = _meetingService.Get(id);

            if (meeting == null)
            {
                return NotFound();
            }

            _meetingService.Remove(meeting.Id);

            return NoContent();
        }
    }
}