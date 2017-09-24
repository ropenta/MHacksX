# MHacksX
## Inspiration
Homeowners should feel safe in their humble abodes, and for that reason many tend to trust home security systems. However, home security systems only alert the residents if a break-in occurs. Even after the break-in occurs, the burglar may still get away hands-free even if the security alarm is tripped. Many burglars often scope out their victims well in advance, so we decided to build an SMS/MMS-based alert system that informs you when an unrecognized guest is at your doorstep.

## What it does
By running a live webcam feed, we can capture an image of someone at your doorstep and run facial recognition on their captured image. Regardless of whether or not the person's face is whitelisted, the homeowner is notified through an simple text message that a guest is at their doorstep, along with an image of the guest. In both scenarios, the homeowner has the option to unlock the door and let their guest into their home. When an unrecognized face is detected, the homeowner also has the option to add the captured image of the guest to the whitelist for future visits, all through a simple text message.

## How we built it
We used a JS framework to put together the Twilio & Azure API's and hosted it on AWS.

## Challenges we ran into
Integrating the SMS alerts/chat with the Twilio API was tricky.

## Accomplishments that we're proud of
Being able to piece together the different API's and working well together as a team.

## What we learned
Learned how to work with new API's.

## What's next for WatchDog
