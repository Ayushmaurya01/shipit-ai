# AI-Assisted Workflow Comparison

## Objective
This exercise compares a vague prompt with a precise prompt while building a settings form for the Ship It AI project.

## Round 1: Vague Prompt
The initial prompt requested a simple settings form with name, email, and notification preferences. The AI generated a working interface with form validation and local storage. However, a broad prompt provides less explicit guidance about file structure, accessibility requirements, edge cases, and verification.

## Round 2: Precise Prompt
The second round was intended to specify file references, constraints, expected behavior, accessibility requirements, and a verification process. The goal was to make the implementation easier to review and test. Both approaches should be evaluated using actual code differences rather than assumptions about which prompt performed better.

## Verification
The recorded terminal results showed six tests passing, a successful production build, and lint completing with zero warnings and zero errors. These results provide evidence that the tested implementation builds and passes its current checks; they do not independently establish complete accessibility or production readiness.

## Review and Lessons Learned
The settings form includes name and email fields, notification choices, validation feedback, and browser-based persistence. Review should also consider keyboard navigation, associated labels, invalid input, empty submissions, and whether saved settings survive a page refresh.

One important lesson is that AI-generated changes must be verified rather than accepted based on appearance alone. The branch comparison returned no differences in tracked files at the time of inspection, so a genuine implementation difference and a specific AI mistake still need to be established before making claims about them.

## Conclusion
Clear prompts, independent verification, and honest documentation make AI-assisted development more reliable. Actual branch differences, review effort, and any observed AI mistakes should be recorded from evidence.
