const loc = document.location;
export const apiurl = `${loc.protocol}//${loc.host}/api`;

export const defaultCodes:{[key: string]:string} = {
	"racket":"#lang racket",
	"golang":`package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}`,
	"java":`class Main {\n\tpublic static void main (String[] args) {\n\n\t}\n}`,
    "php":`<?php`,
}