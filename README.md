# signs-server

Signs-Server uses the `signs` library to create (point) military symbols. It supports MIL-STD-2525 and APP-6, editions C and D.

## Usage

The common URL schema is

`/signs/SIDC[+STANDARD][?param1=&param2=...]`

The `SIDC` must be 15 alpha-numeric characters  for the _legacy_ edition (Charly) or 20 numeric characters for the _modern_ (Delta and beyond) editions. You may choose
between the standards `APP6` and `2525` (the latter is the default if no standard is provided).

To create a symbol based on APP6 (D) you may call `/signs/30031000161205011000+APP6`. If you want to add text amplifiers you can add them as a query parameter like
`/signs/30031000161205011000+APP6?t=Btn1&w=111555Bjul24`



