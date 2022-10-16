# Widgetek használata

## Használat

Két fájlt kell bellítanod a widgetek eléréséhez:

| Típus           | Link                                                     |
| --------------- | -------------------------------------------------------- |
| javascript      | [https://api.icehockey.hu/widgets/js/bundle/v1/mjsz-vbr-bundle](https://api.icehockey.hu/widgets/js/bundle/v2/mjsz-vbr-bundle)   |


A `head` részbe illesztve az alábbi kódot, az oldaladon elérhetővé válnak a widgetek.

``` html {5}
<script src="https://api.icehockey.hu/widgets/js/bundle/v1/mjsz-vbr-bundle"></script>
<link rel="stylesheet" href="https://api.icehockey.hu/widgets/css/bundle/v1/mjsz-vbr-bundle">

<script>
  window.__MJSZ_VBR_WIDGET__ = { apiKey: 'xxxxx' };
</script>
```

## Használat html fájlokban

``` html {7-8}
<meta charset="utf-8">
<title>MJSZ VBR Official Widget Demo</title>
<script src="https://api.icehockey.hu/widgets/js/v1/vbr-official-bundle"></script>
<link rel="stylesheet" href="https://api.icehockey.hu/widgets/css/v1/vbr-official-bundle">

<body>
  <mjsz-vbr-goalies-leader api-key="xxxx" lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-goalies-leader>
  <mjsz-vbr-field-players api-key="xxxx" lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-field-players>
</body>
```
