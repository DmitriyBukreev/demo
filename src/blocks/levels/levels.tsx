import TableContents from "@/components/table-contents";
const { Plate, Apple, Bento, Orange } = TableContents;

const levels = {
  "1": (
    <>
      <Plate id="fancy">
        <Apple className="small"></Apple>
        <Apple htmlFor="Andrew"></Apple>
      </Plate>
      <Plate>
        <Bento>
          <Apple></Apple>
        </Bento>
      </Plate>
    </>
  ),
  "2": (
    <>
      <Bento>
        <Orange></Orange>
      </Bento>
      <Plate>
        <Apple></Apple>
      </Plate>
    </>
  ),
};
export default levels;
