---
name: Sena Birthday Invitation
description: Toy-excavator scrapbook invitation for Sena’s first birthday
colors:
  yellow: "#ffd22e"
  orange: "#f87924"
  ink: "#222222"
  red: "#e63b32"
  white: "#fff"
  rsvp-paper: "#fff4e9"
  button-hover: "#45412f"
  input-border: "#aaa79e"
  selected-paper: "#fff3bb"
  selected-border: "#70601e"
typography:
  display:
    fontFamily: "Sena Display, Barlow Condensed, sans-serif"
    fontSize: "clamp(70px, 8vw, 96px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Sena Display, Barlow Condensed, sans-serif"
    fontSize: "clamp(48px, 6vw, 70px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Sena Text, Nunito, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  label:
    fontFamily: "Sena Text, Nunito, sans-serif"
    fontSize: "12px"
    fontWeight: 700
rounded:
  board: "4px"
  envelope: "6px"
  field: "7px"
  button: "10px"
  form: "12px"
  mobile-nav: "14px"
spacing:
  field: "12px"
  button: "13px 24px"
  form: "32px"
  desktop-gutter: "60px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "{spacing.button}"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "{spacing.field}"
  event-board:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.board}"
    padding: "30px"
  form-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.form}"
    padding: "{spacing.form}"
---

# Sena Birthday Invitation

## Overview

The creative direction is a toy-excavator scrapbook.

Sena’s first-birthday invitation uses the approved toy-excavator and scrapbook direction. Yellow sections, white paper photographs, orange tape, red birthday accents, and dark text frame a warm family celebration.

This design system applies to `/birthday/sena` and its invitation components. The established portfolio, blog, gallery, and wedding surfaces retain their own visual systems.

Key characteristics

- Toy excavators and layered paper keepsakes
- Condensed bold headings with rounded body text
- Large yellow sections and white photograph frames

## Colors

Yellow carries the invitation cover and event section. Orange marks tape, stars, and the excavator theme. Red marks birthday details. Ink supports text, primary actions, and the closing section. White supplies paper frames and form surfaces. The RSVP section uses warm paper.

The frontmatter records the source CSS colors. Additional red shades in the source tune individual headlines and stickers. Preserve those component-specific values when editing the existing surface.

## Typography

`Sena Display` loads Barlow Condensed 800 from `barlow-condensed-800.ttf`. `Sena Text` loads Nunito regular and bold from the birthday font directory. The CSS aliases are local names for those families.

Hero headings use the display token. Section headings use the headline token. Mobile headings become 78px for the hero and 52px for sections at 600px, with the hero reduced to 70px at 360px. Body copy varies from 13px to 15px in the implemented sections. Form labels use 12px bold text on desktop.

## Layout

Desktop sections share a 1200px maximum width. The hero has two equal columns, event details use `1fr 1.1fr`, and RSVP uses `.9fr 1.1fr`. The memory scrapbook uses `1fr 1fr 1.2fr`.

At 900px, gutters, gaps, and photograph sizes tighten. At 600px, the hero, event details, and RSVP stack into one column. The scrapbook has two columns with the family photograph spanning both. Mobile navigation becomes a fixed white bar with a yellow RSVP action and safe-area-aware bottom placement. At 360px, event columns tighten and attendance choices stack.

## Elevation & Depth

Photographs and event details overlap with rotated paper, tape, stickers, and toy imagery. The main photograph rotates 5 degrees, the event board 2 degrees, and scrapbook photographs between −5 and 4 degrees. Soft shadows lift paper above the background.

- Hero photograph uses `0 12px 42px #24201520`.
- Event board uses `0 14px 32px #56350014`.
- Memory photographs use `0 8px 30px #24201518`.
- Mobile navigation uses `0 5px 35px #22222226`.

## Shapes

Paper photographs have square corners. Event details use a 4px radius. Buttons use 10px, fields use 7px, and the RSVP form uses 12px. Circular seals, clipped star shapes, and a clipped birthday-number sticker complete the scrapbook composition.

## Components

The opening cover presents an addressed envelope, photo stamp, and excavator. Opening animates the letter for 900ms and reveals the invitation after 1100ms. Reduced-motion preference removes animations and the opening delay.

Dark primary buttons have a 52px minimum height, 14px bold text, and a 2px upward hover movement. Focus-visible controls use a 3px ink outline offset by 5px. Inputs have 46px minimum height. Selected attendance options use yellow-tinted paper and a dark yellow border.

The event board groups date, time, location, map action, and calendar download. The RSVP form presents name, attendance, guest counts when attending, and an optional message. It includes sending, error, and recorded-answer states.

The main portrait is rendered as `/birthday/sena/sena-main.webp`, sourced from the approved `ILH01006.jpg`. Supporting images form three captioned scrapbook photographs.

## Do's and Don'ts

- Use the documented palette and locally hosted birthday fonts within `/birthday/sena`.
- Preserve the main Sena portrait, paper framing, tape, and excavator imagery.
- Keep event details, directions, calendar download, and RSVP easy to reach.
- Avoid applying this surface-specific design system to the portfolio, blog, gallery, or wedding pages.

Source files are `styles/Birthday.module.css` and `components/BirthdayComp/index.js`.
