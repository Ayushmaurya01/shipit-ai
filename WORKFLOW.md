# AI-Assisted Workflow Comparison

## Objective

This exercise evaluates how prompt specificity, code review, and verification affect implementation of the Ship It AI settings form.

## Round 1: Vague prompt

The initial prompt requested a settings form with name, email, and notification preferences, with a polished appearance and working behavior. The resulting application included controlled inputs, validation, save feedback, localStorage persistence, and three notification choices. However, a broad prompt does not explicitly define every accessibility requirement, edge case, or verification criterion. These requirements must still be checked during review.

## Round 2: Precise review and refinement

The precise branch initially inherited the same implementation as the vague branch. Therefore, the original implementations were identical, and it would be inaccurate to claim that they were independently generated or that one initially outperformed the other. During refinement, explicit HTML required attributes were added to the name and email inputs and notification radio group. These attributes communicate required-field semantics to browsers and assistive technology. The existing custom validation remains responsible for displaying field-specific feedback because the form uses noValidate.

## Comparison

The vague branch provides the baseline implementation. The refined precise branch makes required-field semantics more explicit, reducing ambiguity for users and assistive technology. The change is small, and it does not establish that a precise prompt independently generated a superior implementation. A fair comparison must distinguish the inherited baseline from subsequent improvements and measure review effort using actual changes.

## Verification

The earlier recorded results showed six tests passing, a successful production build, and lint completing with zero warnings and errors. These results apply to the version tested at that time. After refinement, rerun the test suite, lint, and production build before submission. Automated tests do not independently prove complete accessibility; keyboard navigation and screen-reader behavior still require appropriate checks.

## Lessons learned

AI-generated code must be reviewed rather than accepted based on appearance. Prompt specificity helps communicate constraints, but it does not replace testing. Finally, branch history and recorded evidence must support every claim in a workflow comparison.

## Conclusion

Reliable AI-assisted development requires explicit requirements, reviewable changes, repeatable verification, and honest reporting of limitations.
