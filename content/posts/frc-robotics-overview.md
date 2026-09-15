{
  "title": "FRC robotics: software and controls overview",
  "date": "2026-02-13",
  "category": "Project",
  "tags": ["FRC", "Java", "WPILib", "Controls", "Robotics"],
  "summary": "An overview of my work across FRC robot software, drivetrain control, autonomous routines, vision, and mechanisms.",
  "slug": "frc-robotics-overview",
  "imported": true
}
---


## Overview

My FRC work has covered the software and control systems that connect a robot's mechanisms, sensors, autonomous routines, and driver controls. I have worked across drivetrain software, odometry, vision-assisted localization, autonomous path planning, shooter and turret control, telemetry, and debugging with physical hardware.

This work has required moving between Java code, robotics libraries, control theory, sensor behavior, electrical constraints, and mechanical behavior.

## Drivetrain and motion

<figure class="topology-figure">
<div class="topology-scroll" role="region" aria-label="Drivetrain and motion diagram; scroll horizontally on small screens" tabindex="0"><img src="/assets/frc-work-overview.svg" width="900" height="550" loading="lazy" alt="An overview of my FRC work across drivetrain, autonomous routines, vision, controls, telemetry, and hardware integration."></div>
<figcaption>An overview of my FRC work across drivetrain, autonomous routines, vision, controls, telemetry, and hardware integration. <a href="/assets/frc-work-overview.svg">Open full-size diagram</a>.</figcaption>
</figure>

I worked with a swerve drivetrain, where each wheel module can control its speed and direction. The software converts the desired chassis motion into module commands and uses module measurements to estimate the robot's movement.

The drivetrain work included:

- Configuring and controlling swerve modules.
- Working with chassis speeds and module-state conversions.
- Maintaining robot odometry.
- Handling autonomous starting poses.
- Visualizing drivetrain and mechanism state.
- Integrating reusable subsystems into the larger robot program.

## Autonomous routines

I used PathPlanner and WPILib tools to integrate autonomous paths. Autonomous behavior needed to account for the selected alliance and the robot's starting position, so the same general routine could be interpreted correctly on either side of the field.

The work involved coordinating path definitions, subsystem commands, pose handling, and the physical behavior of the robot. Library version compatibility was also part of the job; robotics software depends on several packages that need to work together in the same build.

## Vision and localization

I worked with PhotonVision and AprilTags to obtain vision-based position estimates. Vision measurements can improve localization, but they are not always equally reliable. Lighting, tag visibility, camera pose, and field geometry all affect the quality of a measurement.

That meant evaluating vision uncertainty instead of treating every camera estimate as equally accurate. Combining wheel odometry with noisy vision data is a systems problem: the estimator needs useful measurements while still trusting the robot's motion model when the camera is uncertain.

## Shooter and turret control

I also worked on closed-loop mechanisms using REV motor controllers, brushless motors, and encoder feedback. A shooter loses speed when it transfers energy to a game piece, so the controller has to recover quickly without becoming unstable.

The control work included:

- Investigating RPM droop after firing.
- Combining feedforward with PID feedback.
- Considering a small integral term for recovery error.
- Evaluating derivative behavior and encoder inputs.
- Applying gravity compensation to a rotating mechanism.
- Using logged data to guide tuning decisions.

Feedforward handles predictable behavior from the mechanism, while feedback corrects the remaining error. The right balance depends on inertia, voltage limits, sensor quality, and the response that the mechanism needs.

## Debugging and tools

Telemetry and visualization were important throughout the work. AdvantageKit and AdvantageScope provided ways to record and inspect system state, while the robot libraries supplied the abstractions for devices, commands, and control loops.

When something did not behave as expected, the investigation could involve code, library versions, encoder configuration, wiring, motor behavior, or the physical mechanism. This made logging and clear subsystem boundaries valuable because they narrowed the problem before making another change.
