const loc = document.location;
export const apiurl = `${loc.protocol}//${loc.host}/api`;

export const defaultCodes:{[key: string]:string} = {
	"Scheme":"#lang racket",
	"Golang":`package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}`,
	"Java":`class Main {\n\tpublic static void main (String[] args) {\n\n\t}\n}`,
	"C":`#include <stdio.h>\n\nint main() {\n\treturn 0;\n}`,
	"Cpp":`#include <iostream>\n\nint main() {\n\treturn 0;\n}`
}