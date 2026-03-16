
# Interaction System Specification

## Purpose

Define how motion and interaction behave across the Signals of Niana
experience.

The goal is to produce **cinematic, deliberate motion** rather than flashy UI.

Motion should feel like:

• light drifting through glass
• fragments aligning in slow choreography
• editorial elements responding subtly to presence

---

# Motion Principles

All motion must follow these rules:

slow  
deliberate  
layered  
elegant  

Avoid sudden or exaggerated motion.

Animations should feel expensive and intentional.

---

# Fragment Motion

Fragments should:

• drift slowly across the environment
• shift slightly as the user scrolls
• occasionally align with other fragments
• separate again after a moment

These alignments create temporary meaning.

---

# Cursor Influence

In specific sections, fragments should subtly respond to cursor movement.

Nearby fragments:

• move slightly toward the cursor
• rotate gently
• shift depth

This creates the feeling of **gravitational influence**.

---

# Refraction Layer

A soft visual layer should simulate light refraction.

Possible techniques:

• WebGL shader distortion
• layered transparent gradients
• animated glass textures

The goal is a **subtle luminous atmosphere**, not a heavy visual effect.

---

# Scroll Choreography

Scrolling should trigger:

• fragment reveals
• alignment moments
• subtle lighting changes
• typography fades

Use GSAP ScrollTrigger for sequencing.

---

# Transition Moments

Certain sections should include a **moment of visual pause**.

Examples:

• fragments slowly freezing into alignment
• light passing across the screen
• typography appearing in silence

These moments give emotional weight to the experience.

---

# Performance Requirements

Maintain 60fps whenever possible.

Use:

• lazy loading for media
• requestAnimationFrame loops
• GPU accelerated transforms
