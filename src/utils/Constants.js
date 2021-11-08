/* @flow */
export const BASENAME: string = "lsf-asl-app";
export const LSFBaseEndpoint: string =
  "https://projects.lib.rochester.edu/lsf-asl/wp-json/lsf-rest/v1/definitions/";

export const LSFSearchEndpoint: string =
  "https://projects.lib.rochester.edu/lsf-asl/wp-json/lsf-rest/v1/search/";

// TODO CHANGE THIS TO PROD ON PROD
export const LSF_NAV_ENDPOINT: string =
  "https://projects.lib.rochester.edu/lsf-asl/wp-json/lsf-rest/v1/nav/";

// TODO CHANGE THIS TO PROD ON PROD
export const LSF_ETYMO_ENDPOINT: string =
  "https://projects.lib.rochester.edu/lsf-asl/wp-json/lsf-rest/v1/etymo/";

// TODO CHANGE THIS TO PROD ON PROD
export const LSF_ETYMO_SEARCH_ENDPOINT: string =
  "https://projects.lib.rochester.edu/lsf-asl/wp-json/lsf-rest/v1/search-etymo/";

export const LSF_ETYMO_VIDEO_EN = "https://projects.lib.rochester.edu/lsf-asl/wp-content/uploads/old-lsf-asl-en.mp4";
export const LSF_ETYMO_CAPTIONS_EN = "https://projects.lib.rochester.edu/lsf-asl/wp-content/themes/twentyfifteen-child/captions/old-asl-en.vtt";
export const LSF_ETYMO_VIDEO_FR = "https://projects.lib.rochester.edu/lsf-asl/wp-content/uploads/old-lsf-asl-fr.mp4";
export const LSF_ETYMO_CAPTIONS_FR = "https://projects.lib.rochester.edu/lsf-asl/wp-content/themes/twentyfifteen-child/captions/old-asl-fr.vtt";

export const Alphabet: Array<string> = [
  "0-9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

// Range
export const A_TO_G: string = "a-g";
export const H_TO_M: string = "h-m";
export const N_TO_R: string = "n-r";
export const S_TO_Z: string = "s-z";

export const LETTER_RANGES: Array<string> = [A_TO_G, H_TO_M, N_TO_R, S_TO_Z];

export const LETTER_RANGE_MAP = {
  A_TO_G: A_TO_G,
  H_TO_M: H_TO_M,
  N_TO_R: N_TO_R,
  S_TO_Z: S_TO_Z
};

export const Range: Object = {
  aToG: {
    letters: ["a", "b", "c", "d", "e", "f", "g"],
    string: A_TO_G
  },
  hToM: {
    letters: ["h", "i", "j", "k", "l", "m"],
    string: H_TO_M
  },
  nToR: {
    letters: ["n", "o", "p", "q", "r"],
    string: N_TO_R
  },
  sToZ: {
    letters: ["s", "t", "u", "v", "w", "x", "y", "z"],
    string: S_TO_Z
  }
};

export const AlphabetMap: List<string> = [
  { key: "A", value: "a", text: "A" },
  { key: "B", value: "b", text: "B" },
  { key: "C", value: "c", text: "C" },
  { key: "D", value: "d", text: "D" },
  { key: "E", value: "e", text: "E" },
  { key: "F", value: "f", text: "F" },
  { key: "G", value: "g", text: "G" },
  { key: "H", value: "h", text: "H" },
  { key: "I", value: "i", text: "I" },
  { key: "J", value: "j", text: "J" },
  { key: "K", value: "k", text: "K" },
  { key: "L", value: "l", text: "L" },
  { key: "M", value: "m", text: "M" },
  { key: "N", value: "n", text: "N" },
  { key: "O", value: "o", text: "O" },
  { key: "P", value: "p", text: "P" },
  { key: "Q", value: "q", text: "Q" },
  { key: "R", value: "r", text: "R" },
  { key: "S", value: "s", text: "S" },
  { key: "T", value: "t", text: "T" },
  { key: "U", value: "u", text: "U" },
  { key: "V", value: "v", text: "V" },
  { key: "W", value: "w", text: "W" },
  { key: "X", value: "x", text: "X" },
  { key: "Y", value: "y", text: "Y" },
  { key: "Z", value: "z", text: "Z" }
];

export const COPYRIGHT_INFO = {
  content:
    "<h1>Copyright/Permissions-</h1><p>Materials the University believes to be under copyright or other restrictions are available for limited noncommercial, educational, and personal use only, or for fair use as defined in the United States copyright laws. Users may download these files for their own use, subject to any additional terms or restrictions which may be applicable to the individual file or program. Users must, however, cite the author and source of the Materials as they would material from any work, and the citations should include the URL \"rochester.edu/lsf-asl\" but not in any way that implies endorsement of the user or the user's use of the Materials. By downloading, printing, or otherwise using Materials, whether accessed directly from the Website or via other sites or mechanisms, users agree that they will limit their use of such files to non-commercial, educational, personal or for fair use, and will not violate the University's or any other party's proprietary rights. Users may not remove any copyright, trademark, or other proprietary notices, including without limitation attribution information, credits, and copyright notices that have been placed on or near the Materials by the University. Downloading, printing, copying, distributing or otherwise using Materials for commercial purposes, including commercial publication or personal gain, is expressly prohibited.All rights not expressly granted herein by the University are specifically and completely reserved.The University does not warrant that use of any Materials displayed on the Website will not infringe the rights of third parties not owned by or affiliated with the University. For example, some works may be under copyright by the artist or the artist's heirs holding rights to these works, or may include third-party trademarks or rights of publicity. In many instances the caption may offer more information about the rights status. Such works may not be used in any form; they may not be copied or downloaded without prior permission from the holder of the underlying rights.</p><h1>Droit d'auteur / Permissions de reproduction-</h1><p>Les matériaux que l'université estime étant sous droit d'auteur ou autres restrictions sont disponible pour un usage non-commercial, éducatif, ou personnel uniquement, ou bien pour un usage loyal comme défini par les lois de droit d'auteur des Etats-Unis. Les utilisateurs peuvent télécharger ces fichiers pour leur usage personnel, sous réserve des modalités et des restrictions applicable au fichier individuel ou au programme. Cependant, les utilisateurs sont sous obligation de citer l'auteur et la source des Matériaux tout comme ils le feront avec n'importe autre source, et les citations devraient inclure l'URL \"rochester.edu/lsf-asl\" , mais ne peuvent en aucune manière impliquer l'approbation de l'utilisateur ou l'usage des Matériaux par l'université. Par le téléchargement, impression ou autre usage des Matériaux, qu'ils soient accédés directement du site web ou via des autres sites ou dispositifs, l’utilisateur donne son accord que l'usage de tels fichiers sera limité aux usages non-commerciaux, éducatifs ou personnels ou pour un usage loyal, et qu'il ne violera pas les droits exclusifs de l'université ni d'aucun tiers. Un utilisateur ne peut enlever aucune marque de droit d'auteur, de commerce ni autre droit de propriété, y compris mais sans s'y limiter à l'attribution d'information, les crédits et les marques de droits de propriété qui sont mises par l'université sur ou proche des Matériaux. Le téléchargement, impression, reproduction ou autre usage des Matériaux pour un but commercial, y compris une publication commerciale ou autre but lucratif personnel, est strictement interdit.Tous droits qui ne sont pas expressément accordés ci-dessus sont strictement et complètement réservés.L'université ne garantie pas que l'utilisation des Matériaux publiés sur ce site ne violera pas les droits de tiers en dehors des affiliations ou du propriété de l'université. Par exemple, il se peut que certaines œuvres soient sous droit d'artiste ou sous droit de la famille de l'artiste, ou qu'elles puissent tenir des marques de commerces ou droits de publicité. Dans plusieurs cas, la légende peut fournir des informations supplémentaires par rapport au statut de ces droits. De telles œuvres ne peuvent être utilisées dans aucun cas; elles ne peuvent être reproduites ni téléchargées sans autorisation préalable du détenteur des droits initiaux.</p><h1> Mobile App Privacy Policy </h1><p> This privacy policy governs your use of the software application ASL - LSF (\"Application\") for mobile devices that was created by the Digital Scholarship Lab and the ASL Program.</p><h4>What information does the Application obtain, and how is it used?</h4><p> The Application does not obtain any information from the user.</p><h4> Does the Application collect precise real time location information of the device? </h4><p> No, the Application does not collect any location-related information of the device </p><h4> Do third parties see and / or have access to information obtained by the Application? </h4><p> No, no third parties can see or have access to information obtained by the Application, since no information is actually obtained </p><h4> Security </h4><p>We are concerned about safeguarding the confidentiality of your information. We provide physical,electronic, and procedural safeguards to protect information we process and maintain. For example,we limit access to this information to authorized employees and contractors who need to know thatinformation in order to operate, develop or improve our Application. Please be aware that,although we endeavor provide reasonable security for information we process and maintain, nosecurity system can prevent all potential security breaches.</p><h4> Your Consent </h4><p> By using the Application, you are consenting to this privacy policy. If you have any questions regarding the Application, please contact us at lsfaslrochester@gmail.com</p>",
  title: "Copyright Info",
  path: "copyright",
  static: true
};
