import { Note, DiagramBox, RefTable } from "@joshdavidoff/site-ds";

// `.note` as a standalone italic footnote (`font-size:15px; font-style:italic;
// margin-top:48px`) has a CSS rule but no live `<p class="note">` anywhere on
// the site — every real use is `<td class="note">` inside `.ref-table`, which
// overrides font-style/margin-top. So this component's standalone rendering
// is reconstructed from the CSS selector alone and is one of the
// least-verified in the system. It IS self-contained (not gated behind a
// parent selector), so a bare render should still pick up italic + faint
// color + top margin correctly if the reconstruction is right. Text below is
// lifted from the real "Notes" column and "What I Learned" caveats on
// projects/fluxx-monday-operational-layer.html.

/** A standalone footnote, as it would sit below a section of body copy. */
export const Default = () => (
  <Note>
    High-control area; Power BI depends on SharePoint list integrity.
  </Note>
);

/** A longer caveat, to check line-wrap and the italic treatment over multiple lines. */
export const LongCaveat = () => (
  <Note>
    Shadow systems can be useful as a way to overcome hardcoded tool
    limitations, but a correct implementation requires a clear purpose,
    strong guardrails, and extremely careful error handling and two-way
    sync.
  </Note>
);

/** `Note` nested inside `.ref-table` (via a table cell) picks up the override that
 * cancels the italic style and shrinks the top margin — shown for contrast with
 * the standalone cells above. */
export const NestedInRefTable = () => (
  <DiagramBox>
    <RefTable
      columns={["Object", "Notes"]}
      rows={[
        [
          { content: "Cash flow visuals" },
          {
            content: (
              <Note>Verify upstream list health before trusting visuals.</Note>
            ),
          },
        ],
      ]}
    />
  </DiagramBox>
);
