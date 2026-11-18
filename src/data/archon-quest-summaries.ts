export type ArchonQuestExpandedSummary = {
  narrative: string;
  outcome: string;
};

export const archonQuestNarrativeReference = {
  label: 'Índice narrativo documentado de Misiones de Arconte',
  href: 'https://teyvatica.com/story',
} as const;

export const archonQuestExpandedSummaries: Record<string, ArchonQuestExpandedSummary> = {
  'prologo-acto-i': {
    narrative: 'Después de despertar sin su gemelo, el Viajero conoce a Paimon y llega a Mondstadt en medio de un ataque de Dvalin. Amber lo conduce a la ciudad, donde Jean, Lisa y Kaeya coordinan la defensa. Al limpiar los templos que alimentan la tormenta, el Viajero demuestra que puede purificar las lágrimas corrompidas del dragón, una capacidad que los habitantes de Teyvat no comprenden.',
    outcome: 'Mondstadt acepta al Viajero como aliado y la crisis deja de parecer un simple ataque: alguien está manipulando a Dvalin.',
  },
  'prologo-acto-ii': {
    narrative: 'El Viajero encuentra al bardo Venti, quien revela su vínculo con Dvalin y propone calmarlo con la Lira Sagrada. El intento fracasa cuando los Fatui intervienen, pero Diluc y Jean se unen a la investigación. Las lágrimas purificadas permiten reparar la lira y seguir el rastro del dragón hasta su guarida, mientras la Orden del Abismo queda identificada como la fuerza que alimenta su dolor y resentimiento.',
    outcome: 'El grupo entiende que debe liberar a Dvalin de la corrupción, no derrotarlo como a un enemigo, y reúne los medios necesarios para entrar en su guarida.',
  },
  'prologo-acto-iii': {
    narrative: 'Venti, Jean, Diluc y el Viajero atraviesan las barreras de la Guarida de Stormterror y rompen los coágulos de corrupción que someten a Dvalin. Tras reconciliarse con el dragón, Venti confirma su identidad como Barbatos. La victoria dura poco: Signora lo embosca frente a la catedral y le arrebata la Gnosis Anemo en nombre de la Zarina.',
    outcome: 'Mondstadt recupera la paz, pero la búsqueda del gemelo queda conectada con la Orden del Abismo y con el plan de los Fatui para reunir las Gnosis.',
  },
  'capitulo-i-acto-i': {
    narrative: 'El Viajero llega a Liyue para preguntar por su gemelo durante el Rito del Descenso, pero Rex Lapis cae aparentemente muerto ante la multitud. Considerado sospechoso, huye de los Milicianos con la ayuda de Tartaglia, quien le entrega un sello para solicitar audiencia a los adepti. El recorrido por Jueyun le permite presentar el caso fuera del control de las Siete Estrellas y descubrir que la muerte del Arconte amenaza con dividir a humanos y adepti.',
    outcome: 'La investigación queda atrapada entre tres fuerzas: las Siete Estrellas, los adepti y los Fatui representados por Tartaglia.',
  },
  'capitulo-i-acto-ii': {
    narrative: 'Tartaglia presenta al Viajero a Zhongli, consultor de la Funeraria El Camino, para organizar el Rito del Adepto destinado a despedir a Rex Lapis. La búsqueda de perfumes, campanas, flores y otros objetos recorre las tradiciones de Liyue y muestra el extraordinario conocimiento de Zhongli. Paralelamente, la invitación de Ningguang al Palacio de Jade y la actividad Fatui vuelven cada vez más sospechosa la aparente muerte del Arconte.',
    outcome: 'El rito aproxima al Viajero a Zhongli, pero también reúne las pistas que conducirán al Palacio de Jade y al conflicto por la Gnosis Geo.',
  },
  'capitulo-i-acto-iii': {
    narrative: 'Ningguang revela lo que las Siete Estrellas saben de los Fatui y el Viajero sigue a Tartaglia hasta la Casa Dorada. Al descubrir que el Exuvia no contiene la Gnosis, el Heraldo libera a Osial para obligar a Rex Lapis a intervenir. Adepti, Milicianos y Siete Estrellas combaten juntos; Ningguang sacrifica el Palacio de Jade para sellar al dios. Después, Zhongli admite ser Morax y explica que fingió su muerte para probar si Liyue podía gobernarse sin él antes de entregar voluntariamente su Gnosis a Signora como parte de un contrato.',
    outcome: 'Liyue comienza la era de los humanos, mientras la Zarina obtiene una segunda Gnosis y el contenido del contrato con Morax permanece desconocido.',
  },
  'capitulo-i-acto-iv': {
    narrative: 'Una comisión sobre un tesorero desaparecido lleva al Viajero y a Dainsleif tras un Heraldo del Abismo y una Estatua de los Siete invertida. La Orden pretende construir una deidad mecánica usando el primer Guardián de las Ruinas y el ojo del Señor del Vórtice. En las ruinas finales aparece el gemelo perdido, que viaja con la Orden, llama a Dainsleif enemigo y pide al Viajero que complete su recorrido por Teyvat antes de juzgar su causa.',
    outcome: 'La reunión confirma que el gemelo no está cautivo: dirige su propio camino junto al Abismo y conoce la verdad sobre Khaenri’ah.',
  },
  'capitulo-ii-prologo': {
    narrative: 'Para encontrar una ruta hacia Inazuma, el Viajero se une al Torneo Crux organizado por Beidou. El premio es una Visión sin dueño que perteneció al amigo de Kazuha, ejecutado tras desafiar a la Shogun Raiden. Al perseguir a un ladrón y ganar el torneo, el Viajero demuestra su fuerza sin depender de una Visión, y Beidou acepta llevarlo a través de la tormenta que mantiene cerrada la nación.',
    outcome: 'El viaje hacia Inazuma queda asegurado y la historia de Kazuha anticipa el coste humano del Decreto de Captura de Visiones.',
  },
  'capitulo-ii-acto-i': {
    narrative: 'Tras desembarcar en Ritou, el Viajero necesita la ayuda de Thoma y la Comisión Yashiro para superar las restricciones a los extranjeros. Ayaka le muestra a tres personas que perdieron ambición, memoria o propósito después de que les confiscaran sus Visiones. Aunque inicialmente solo quiere hablar con la Arconte, el Viajero acepta combatir el decreto. La ceremonia pública para arrebatar la Visión de Thoma termina con una confrontación directa contra la Shogun y una huida de la capital.',
    outcome: 'El Viajero pasa de visitante a enemigo del shogunato y decide unirse a quienes resisten el Decreto de Captura de Visiones.',
  },
  'capitulo-ii-acto-ii': {
    narrative: 'Perseguido por la Comisión Tenryou, el Viajero llega al frente de Tatarasuna y auxilia a las tropas de Watatsumi. Kokomi lo incorpora a la resistencia y Teppei se convierte en su compañero más cercano. Las victorias iniciales ocultan un problema: una ayuda anónima está entregando Engaños a los soldados, otorgándoles poder a cambio de consumir aceleradamente sus vidas.',
    outcome: 'La guerra deja de ser solo una disputa interna cuando el Viajero descubre que los Fatui están prolongándola y explotando a ambos bandos.',
  },
  'capitulo-ii-acto-iii': {
    narrative: 'La muerte de Teppei lleva al Viajero a una fábrica de Engaños, donde Scaramuccia lo incapacita y Yae Miko negocia su rescate entregando la Gnosis Electro. Con su entrenamiento y un amuleto, el Viajero obtiene la colaboración de Sara y expone la traición de las comisiones. Tras vencer a Signora en un duelo ante el trono, presencia su ejecución y vuelve a enfrentarse a Ei dentro del Plano de la eutimia, apoyado por las ambiciones reunidas en la estatua.',
    outcome: 'Ei comprende que la eternidad inmóvil niega los deseos de su pueblo y abole el Decreto de Captura de Visiones, aunque Inazuma todavía debe reparar sus heridas.',
  },
  'intermedio-acto-i': {
    narrative: 'Ningguang organiza una competencia para reunir los materiales con los que reconstruirá el Palacio de Jade. El Viajero conoce a Shenhe, una discípula de los adepti aislada de la sociedad, y la ayuda a conseguir el mineral necesario. Cuando Beisht ataca el puerto, Shenhe enfrenta el trauma de su infancia y protege a Liyue junto a las Siete Estrellas y los Milicianos, sin esperar que Rex Lapis intervenga.',
    outcome: 'El nuevo Palacio de Jade simboliza una Liyue gobernada por humanos, y Shenhe encuentra una primera posibilidad de regresar a la vida entre ellos.',
  },
  'capitulo-ii-acto-iv': {
    narrative: 'Dainsleif y el Viajero encuentran en la Sima una ciudad invertida donde hilichurls moribundos buscan descansar. La Orden del Abismo intenta activar un dispositivo que revertiría la maldición de Khaenri’ah, aunque el proceso destruiría a quienes ya no pueden recuperar su forma. Halfdan y los Caballeros Serpiente Negra se rebelan contra el plan para proteger a los afectados, y Dainsleif detiene el mecanismo.',
    outcome: 'La maldición se muestra como un daño que no puede deshacerse por la fuerza, y Halfdan confirma que parte de la guardia de Khaenri’ah conservó su deber durante quinientos años.',
  },
  'intermedio-acto-ii': {
    narrative: 'El Viajero, Yanfei, Yelan, Itto y Kuki quedan atrapados en un espacio cambiante bajo la Sima; Xiao también se interna allí buscando noticias del yaksha Bosacius. El lugar materializa temores y recuerdos, altera el paso del tiempo y separa al grupo. Una Brújula fantástica permite reconstruir el último combate de los Millelith y abrir una salida, pero Xiao intenta sacrificarse para que los demás escapen hasta que Zhongli interviene en secreto.',
    outcome: 'Xiao acepta parte del apoyo de sus compañeros y la expedición recupera la memoria de Bosacius y de quienes defendieron la Sima durante el Cataclismo.',
  },
  'capitulo-iii-acto-i': {
    narrative: 'El Viajero entra en Sumeru buscando a la Arconte Dendro, pero un encuentro con incienso lo hace perder el conocimiento y vislumbrar un árbol gigantesco en peligro. Tighnari y Collei lo reciben en Gandharva, mientras la Akademiya y el Akasha dominan la circulación del conocimiento. En la ciudad conoce a Dunyarzad, Dehya y Nilou; después viaja a Puerto Ormos, donde la investigación de unas cápsulas de conocimiento revela los primeros indicios del proyecto secreto de los Sabios.',
    outcome: 'La búsqueda de Nahida queda ligada a una anomalía en Irminsul y a una conspiración de la Akademiya que involucra a los Fatui.',
  },
  'capitulo-iii-acto-ii': {
    narrative: 'Durante el Festival Sabzeruz, el mismo día comienza a repetirse y solo el Viajero conserva recuerdos parciales de cada ciclo. Con la ayuda de Nahida descubre que los ciudadanos sueñan dentro de un samsara creado por el Akasha para cosechar su energía mental. El estado de Dunyarzad empeora fuera del sueño y obliga al grupo a encontrar al anfitrión del ciclo antes de que sea demasiado tarde. Nilou comprende que sueña y recrea finalmente la danza prohibida por los Sabios.',
    outcome: 'El ciclo se rompe, Nahida establece contacto directo con el Viajero y la Akademiya queda confirmada como responsable de usar a la población como recurso.',
  },
  'capitulo-iii-acto-iii': {
    narrative: 'Nahida y el Viajero investigan los experimentos de los Sabios mientras Dottore regresa a Sumeru. Setaria, una erudita del desierto, es presionada mediante las voces de personas que conoce para que abandone la Akademiya y colabore con la resistencia. Sin embargo, Dottore anticipa el plan, toma control de los usuarios del Akasha y obliga a Nahida a negociar mientras el Viajero huye hacia el desierto.',
    outcome: 'La conspiración queda expuesta como un proyecto para fabricar un nuevo dios con Scaramuccia, y Nahida permanece aislada bajo el control de los Sabios.',
  },
  'capitulo-iii-acto-iv': {
    narrative: 'En Aaru, el Viajero se alía con Cyno, Dehya, Candace y Alhacén para investigar a los guardianes de aldeas y a los eruditos exiliados que desaparecen. El secuestro de Isak y las ruinas del rey Deshret revelan que el conflicto histórico entre el desierto y la selva se sostiene sobre una versión incompleta del pasado. Un registro muestra que Rukkhadevata ayudó a Deshret y protegió a su pueblo tras su sacrificio.',
    outcome: 'Los aliados dejan atrás sus divisiones, rescatan a los eruditos y forman el grupo que intentará liberar a Nahida y enfrentar a los Sabios.',
  },
  'capitulo-iii-acto-v': {
    narrative: 'Alhacén organiza una operación en varios frentes: Nilou distrae a los guardias, Dehya y los eremitas intervienen fuera de la ciudad, Cyno arresta a los responsables y el Viajero libera a Nahida. Juntos entran en la conciencia del dios artificial Shouki no Kami y derrotan a Scaramuccia. Nahida elimina después a Rukkhadevata de Irminsul para detener el conocimiento prohibido; el mundo olvida su existencia y atribuye sus actos a la propia Nahida.',
    outcome: 'Sumeru abandona el Akasha, Nahida asume públicamente su lugar como Arconte y Dottore obtiene la Gnosis Dendro tras negociar información sobre los Descendidos.',
  },
  'intermedio-acto-iii': {
    narrative: 'Nahida pide al derrotado Scaramuccia que busque información en Irminsul bajo la vigilancia del Viajero. Al descubrir el papel de Dottore en las tragedias de Tatarasuna, intenta borrar su propia existencia para evitar que ocurran. El pasado no cambia: solo desaparece su identidad de la memoria del mundo. El Viajero le devuelve sus recuerdos, él recupera una Visión Anemo y adopta el nombre de Trotamundos para hacerse responsable de sus actos.',
    outcome: 'La misión establece que Irminsul puede reescribir registros y recuerdos, pero no deshacer los hechos; además, una voz desconocida confirma al Viajero que la historia puede sobrevivir convertida en relatos.',
  },
  'capitulo-iii-acto-vi': {
    narrative: 'Una conversación con Kaeya lleva al Viajero y a Dainsleif a una casa abandonada en Sumeru. Allí el Viajero revive un recuerdo de su gemelo y de Chlothar Alberich, un noble de Khaenri’ah desesperado por curar a su hijo hilichurl, Cariberto. Un poder asociado a un “Pecador” parece devolverle la conciencia, pero el resultado conduce a una tragedia y a la fundación de la Orden del Abismo.',
    outcome: 'Chlothar queda identificado como fundador de la Orden, Cariberto como centro de su motivación y el gemelo como testigo directo de ese origen.',
  },
  'capitulo-iv-acto-i': {
    narrative: 'Al llegar a Fontaine, el Viajero conoce a Furina, Neuvillette y los hermanos Lyney y Lynette. Una muerte durante el espectáculo de magia convierte a Lyney en acusado y al Viajero en su defensor. La reconstrucción del truco demuestra que el responsable utilizó una red de desapariciones y Agua Primordial, pero el juicio también revela que Lyney y Lynette pertenecen a la Casa de la Hoguera de los Fatui.',
    outcome: 'Fontaine queda presentada como una nación gobernada por el espectáculo judicial, mientras la profecía del diluvio y el origen del Agua Primordial pasan al centro del misterio.',
  },
  'capitulo-iv-acto-ii': {
    narrative: 'Navia reabre el caso de las jóvenes desaparecidas y la muerte de su padre, Callas. Junto al Viajero vincula las disoluciones a Marcel, cuya verdadera identidad y motivación nacen de la pérdida de Vacher y de sus experimentos con Agua Primordial. En el tribunal, las víctimas disueltas se manifiestan a través de la Fuente Lucine y la verdad limpia el nombre de Callas, aunque Navia debe asumir el peso de lo ocurrido.',
    outcome: 'El caso demuestra que los habitantes de Fontaine pueden disolverse y que las conciencias de las víctimas permanecen conectadas, haciendo tangible la amenaza de la profecía.',
  },
  'capitulo-iv-acto-iii': {
    narrative: 'Neuvillette envía al Viajero al Fuerte Merópide para investigar la desaparición de Tartaglia. Bajo la administración de Wriothesley, el grupo sigue rumores sobre reglas secretas, una enfermería y una producción oculta. Lyney, Lynette y Freminet buscan por su cuenta información para Arlecchino. Las pesquisas revelan que las supuestas reglas encubren una investigación mayor y que algo peligroso permanece sellado bajo la prisión.',
    outcome: 'La búsqueda de Tartaglia conecta sus sueños con una criatura en el mar, mientras el Fuerte queda establecido como la primera defensa contra el Agua Primordial.',
  },
  'capitulo-iv-acto-iv': {
    narrative: 'Wriothesley muestra el barco y las compuertas construidas para contener el mar de Agua Primordial bajo el Fuerte. Cuando el sello cede, Neuvillette contiene temporalmente la inundación y confirma la gravedad de la profecía. En la superficie, Arlecchino presiona a Furina para que presente un plan, convencida de que oculta información. El Viajero intenta comprender la soledad de la Arconte, pero ella continúa representando su papel sin revelar la solución.',
    outcome: 'Fontaine queda al borde de una inundación inevitable, y la falta de respuestas de Furina lleva a sus propios aliados a preparar una confrontación judicial.',
  },
  'capitulo-iv-acto-v': {
    narrative: 'Tras la catástrofe de Poisson, Navia, Neuvillette y el Viajero llevan a Furina a juicio para obligarla a revelar la verdad. Su aparente divinidad se desmorona, pero el proceso forma parte del plan de Focalors: separar su humanidad, acumular indemnitium y destruir el trono de la Arconte Hydro. Neuvillette recupera su autoridad de Dragón Soberano, perdona el “pecado” de los fontainianos y enfrenta junto al Viajero a la Ballena Devoraestrellas.',
    outcome: 'La profecía se cumple sin exterminar a Fontaine; Furina queda libre de quinientos años de representación y el poder Hydro regresa a Neuvillette.',
  },
  'capitulo-iv-acto-vi': {
    narrative: 'Una desaparición olvidada en Vimara conduce al Viajero y a Dainsleif hasta Cariberto y el proyecto del Telar del Destino. El Abismo usa recuerdos artificiales para ocultar su operación, y el gemelo consigue completar el telar antes de que Dainsleif pueda detenerlo. Cariberto comparte un último momento con el Viajero y permite que ambos hermanos recuerden un encuentro que el destino habría borrado.',
    outcome: 'El Telar del Destino adquiere la capacidad de crear nuevas líneas ley, mientras el gemelo obtiene una herramienta capaz de modificar el orden del mundo.',
  },
  'capitulo-v-acto-i': {
    narrative: 'El Viajero entra en Natlan junto a Kachina y conoce una nación donde la guerra contra el Abismo determina la vida de cada tribu. Kachina participa en el Peregrinaje del Retorno del Fuego Sagrado y consigue un lugar entre los guerreros que combatirán en el Reino de la Noche. Después, Mualani recibe al grupo entre el Pueblo de los Manantiales, pero un ataque del Abismo demuestra que la amenaza ya no está limitada al campo de batalla ritual.',
    outcome: 'El Viajero entiende que la resurrección de los guerreros depende de las líneas ley especiales de Natlan y que ese sistema está empezando a fallar.',
  },
  'capitulo-v-acto-ii': {
    narrative: 'Kachina no regresa de su primera Guerra de los Guardianes de la Noche, por lo que Mualani, Chasca y el Viajero entran al Reino de la Noche para recuperarla. Mientras tanto, Capitano desafía a Mavuika por la Gnosis y Ororon facilita su retirada. La Arconte salva la llama y a sus guerreros consumiendo los objetos donde había guardado siglos de recuerdos y poder, un recurso que no podrá reponer fácilmente.',
    outcome: 'Kachina vuelve, pero Natlan pierde parte de su protección y queda abierta la carrera entre el plan de Mavuika, el de Capitano y el avance del Abismo.',
  },
  'capitulo-v-acto-iii': {
    narrative: 'Para participar plenamente en el plan de Mavuika, el Viajero necesita un Nombre Antiguo que Xilonen solo puede forjar a partir de una gesta reconocida por Natlan. La búsqueda de Ororon lo reúne con Citlali y descubre que el joven colabora con Capitano, no por lealtad a los Fatui, sino porque cree que su método puede salvar a la nación. Las investigaciones revelan que ambos bandos quieren reparar las líneas ley, aunque están dispuestos a pagar precios muy distintos.',
    outcome: 'El conflicto deja de ser una división simple entre aliados y enemigos: Capitano posee un plan alternativo y Ororon se convierte en la pieza que conecta ambas estrategias.',
  },
  'capitulo-v-acto-iv': {
    narrative: 'El intento de detener el plan rival queda interrumpido cuando el Abismo lanza una invasión a gran escala. Las tribus combaten en varios frentes y el Viajero debe decidir dónde intervenir, sin poder evitar todas las pérdidas. Mavuika convoca el poder de los héroes de Natlan y coordina la defensa hasta contener la ofensiva, pero la guerra muestra que las medidas temporales ya no bastan.',
    outcome: 'Natlan sobrevive al asalto, aunque queda devastada; la victoria definitiva exige llevar la lucha al corazón del Abismo dentro del Reino de la Noche.',
  },
  'capitulo-v-entreacto': {
    narrative: 'Con el ataque inmediato rechazado, el Viajero acompaña a Iansan y al Clan Plumaflora para atender a combatientes que regresaron heridos o incapaces de retomar su vida. La misión se concentra en el duelo, el miedo y la reconstrucción cotidiana, mostrando que la resurrección no borra el trauma de la guerra. Las tribus convierten esos cuidados en una forma de resistencia colectiva antes de la batalla final.',
    outcome: 'El entreacto devuelve el foco a las personas que sostienen Natlan y establece que la recuperación de la nación no depende únicamente de sus héroes.',
  },
  'capitulo-v-acto-v': {
    narrative: 'Mavuika y el Viajero llevan la ofensiva al Reino de la Noche para destruir la fuente que permite al Abismo devorar Natlan. El plan reúne a los seis héroes y emplea el Nombre Antiguo del Viajero para abrir un camino de regreso. Capitano, ligado a Khaenri’ah y a las almas que ha cargado durante quinientos años, termina ofreciendo su propia existencia para resolver la deuda con Ronova y preservar el ciclo de la Noche.',
    outcome: 'La amenaza principal es derrotada y Natlan conserva su futuro, pero la victoria cierra la historia de Capitano y deja visibles las reglas impuestas por las Sombras de Celestia.',
  },
  'intermedio-acto-iv': {
    narrative: 'Durante el Festival de las Flores de Viento, Albedo es acusado de un asesinato imposible de conciliar con lo que sus amigos conocen de él. El Viajero investiga junto a los Caballeros, Kaeya, Venti y Klee mientras aparecen contradicciones relacionadas con la alquimia de Rhinedottir. Alice y otros vínculos del Aquelarre amplían el caso hasta convertirlo en una revelación sobre la creación de Albedo, Durin y los límites entre una vida fabricada y una vida auténtica.',
    outcome: 'La inocencia de Albedo queda ligada a una verdad mayor sobre su creadora, y Mondstadt pasa a ocupar un lugar central en los misterios cosmológicos del viaje.',
  },
  'capitulo-v-acto-vi': {
    narrative: 'Los ataques de la Orden del Abismo sobre las tribus coinciden con la búsqueda de una llave de hibernación y con la aparición de Direidyth, una joven que espera a un “Salvador”. Dainsleif regresa y el rastro conduce a un espacio donde recuerdos, tiempos y posibilidades se superponen. El Viajero vuelve a aproximarse a su gemelo y a las consecuencias del Telar del Destino, pero las respuestas quedan condicionadas por aquello que cada uno está dispuesto a sacrificar.',
    outcome: 'El cierre de Natlan retoma la trama del gemelo y prepara el viaje hacia Nod Krai, donde las alteraciones del mundo ya no son solo recuerdos reescritos.',
  },
  'cancion-lunar-preludio': {
    narrative: 'En una playa de Natlan aparece Ineffa, una autómata humanoide con recuerdos dañados y un criptex dirigido al Viajero. Xilonen y los aliados de Natlan ayudan a reparar su núcleo mientras una serie de autómatas de tecnología antigua reacciona a su presencia. Al recuperar parte de su identidad, Ineffa reconoce que “hogar” no es únicamente el lugar para el que fue construida. Una carta de Varka invita entonces al grupo a buscarlo en La Nave Insignia de Nod Krai.',
    outcome: 'Ineffa se convierte en la primera guía del nuevo arco y el mensaje de Varka enlaza la crisis tecnológica de Natlan con la Cacería salvaje de Nod Krai.',
  },
  'cancion-lunar-acto-i': {
    narrative: 'El Viajero llega con Ineffa a Nod Krai, conoce a Aino, Lauma, Nefer, Jahoda y Flins y se ve arrastrado al conflicto entre los Fatui y los Descendientes de la Luna Escarchada. Durante una noche extraordinaria se reúne con su gemelo y ambos superan juntos las pruebas que protegen la Médula Lunar. El reencuentro termina cuando el gemelo desaparece, el relicario queda vacío y la presencia del Abismo activa las defensas del santuario.',
    outcome: 'La Médula Lunar se convierte en el centro de la disputa, mientras Columbina y Lauma revelan que la luna visible y el cielo de Teyvat no cuentan toda la verdad.',
  },
  'cancion-lunar-acto-ii': {
    narrative: 'El grupo repara el cañón de kuuvahki de Aino e investiga ataques de la Cacería salvaje alrededor de Nasha. Las incursiones parecen seguir un patrón relacionado con las Médulas Lunares y con la energía de la región. Flins y los guardianes contienen a las criaturas mientras la investigación descubre que no se trata de una fuerza sin voluntad: alguien ligado al pasado de Khaenri’ah está reconstruyendo su poder detrás de ellas.',
    outcome: 'La Cacería salvaje adquiere un responsable y un propósito, y el conflicto local pasa a formar parte de una historia mucho más antigua que Nod Krai.',
  },
  'cancion-lunar-acto-iii': {
    narrative: 'Con Rerir nuevamente encarnado, sus ataques consumen el kuuvahki de Nod Krai y amenazan directamente a Columbina. Varka rescata al grupo y Nefer organiza una operación para comprender al enemigo, mientras Arlecchino ayuda a localizar la Médula Iridiscente. Los recuerdos recuperados muestran la vida de Rerir bajo el reinado de Irmin y su conexión con la antigua Khaenri’ah, al tiempo que Columbina intenta restaurar el poder que está perdiendo.',
    outcome: 'La alianza incorpora a Varka y Arlecchino, y la búsqueda de las tres Médulas Lunares queda establecida como la única forma de enfrentar a Rerir en igualdad de condiciones.',
  },
  'cancion-lunar-acto-iv': {
    narrative: 'Dainsleif se une al grupo y pide a Nefer que profundice en los recuerdos de Rerir. Las incursiones mentales reconstruyen sus vínculos, sus deberes en Khaenri’ah y el modo en que su identidad terminó subordinada a una obsesión. Una segunda exploración obliga a Nefer a enfrentar su propio pasado antes de que todos se reúnan para la confrontación. El combate no resuelve únicamente una amenaza física: enfrenta dos maneras de responder a una nación y una luna perdidas.',
    outcome: 'La derrota de Rerir cierra el primer movimiento de la Cacería salvaje, pero las memorias recuperadas dejan abiertas preguntas sobre los Pecadores y el destino de Columbina.',
  },
  'cancion-lunar-acto-v': {
    narrative: 'Mientras Nod Krai prepara la Noche de Plegarias Lunares, apariciones del pasado comienzan a manifestarse por toda la región. El Viajero y sus compañeros se dividen para determinar si son recuerdos, engaños o una consecuencia de las Médulas. Alice y otros integrantes del Aquelarre aportan sus conocimientos cuando el fenómeno supera las explicaciones locales, y la celebración se transforma en la preparación de una expedición hacia las ruinas hiperbóreas.',
    outcome: 'Las visiones conducen a una forma de buscar el nombre verdadero de Columbina y convierten el festival en la antesala de su decisión final.',
  },
  'cancion-lunar-acto-vi': {
    narrative: 'La expedición atraviesa las ruinas hiperbóreas para reconstruir el origen y el nombre de Columbina. La Noche de Plegarias reúne a las comunidades de Nod Krai, pero el ritual para abrir el camino hacia las lunas atrae la intervención de Dottore. Columbina debe elegir entre el hogar que desea alcanzar y las personas que ahora reconoce como propias, mientras el Viajero intenta impedir que el experimento Fatui convierta esa elección en otra forma de cautiverio.',
    outcome: 'El arco de Nod Krai llega a su punto de quiebre: Columbina inicia el regreso a la luna y el Viajero queda separado de sus aliados bajo la amenaza directa de Dottore.',
  },
  'cancion-lunar-acto-vii': {
    narrative: 'Tras la confrontación, los aliados coordinan una misión de rescate mientras Dottore extiende su control sobre Nod Krai y comienza una evacuación de varias facciones. Varka distribuye a caballeros y guardianes para proteger a la población; Nefer sigue los movimientos enemigos y el Aquelarre estudia cómo revertir el experimento. Desde un tiempo o reflejo distinto, Columbina intenta comunicarse con quienes dejó atrás y orientar la búsqueda.',
    outcome: 'La resistencia deja de depender de una sola nación o facción y convierte el rescate del Viajero en una ofensiva conjunta contra el proyecto de Dottore.',
  },
  'cancion-lunar-acto-viii': {
    narrative: 'Columbina recorre el reflejo de la luna y encuentra figuras ligadas a su origen mientras, en Nod Krai, el grupo realiza su última operación contra Dottore. Las tres lunas, las Médulas y el falso firmamento confluyen en una disputa por decidir si la identidad de Columbina pertenece a quienes la crearon, a quienes la veneraron o a ella misma. El enfrentamiento final permite recuperar al Viajero y detener la apropiación del poder lunar.',
    outcome: 'Nod Krai recupera la posibilidad de definir su futuro y Columbina obtiene una respuesta propia sobre su nombre y su hogar, aunque la naturaleza del cielo sigue abierta.',
  },
  'cancion-lunar-acto-ix': {
    narrative: 'Una visión de Collei anuncia una catástrofe y Nahida enferma gravemente mientras investiga una anomalía de Irminsul. El Viajero regresa a Sumeru para buscar una cura, pero la crisis afecta tanto a los recuerdos como a la estabilidad física del mundo. Las huellas conducen al desierto, donde los Fatui intentan aprovechar el debilitamiento del árbol y los conocimientos enterrados de las antiguas civilizaciones.',
    outcome: 'Sumeru vuelve a enfrentar la relación entre memoria y existencia, esta vez sin poder resolverla simplemente eliminando un nombre de Irminsul.',
  },
  'cancion-lunar-acto-x': {
    narrative: 'Nahida, los eruditos, los descendientes de los antiguos dioses y los habitantes de Sumeru colaboran para activar Aaru, un dispositivo construido para intervenir en una crisis de escala nacional. El plan exige combinar conocimiento académico, registros de Irminsul y decisiones de personas que no pueden delegar su futuro en una divinidad. Tras contener la amenaza, el Viajero visita Natlan y Mondstadt para cerrar las consecuencias que el fenómeno dejó fuera de Sumeru.',
    outcome: 'Canción lunar concluye mostrando que la verdad sobre Teyvat está repartida entre naciones y prepara el paso hacia Snezhnaya y el conflicto abierto con Celestia.',
  },
  'capitulo-vii-acto-i': {
    narrative: 'El Viajero y Paimon entran en Snezhnaya y quedan atrapados en una región marcada por el frío, una crisis energética y un tren inmovilizado. Una antigua máquina consciente y las necesidades de una población aislada los conducen desde la supervivencia inmediata hasta la política nacional. En Snezhnograd conocen el consejo que administra el país y descubren la existencia de Rokot, una red clandestina que opera debajo de las estructuras oficiales.',
    outcome: 'Snezhnaya aparece como una sociedad más compleja que los Fatui: la escasez energética, el gobierno civil y las redes secretas condicionan incluso los planes de la Zarina.',
  },
  'capitulo-vii-acto-ii': {
    narrative: 'Una presentación en el Teatro Korolevski se convierte en una investigación cuando la nieve y una serie de incidentes aíslan a artistas, funcionarios y activistas. El Viajero sigue el caso de Lelek a través de registros teatrales y testimonios contradictorios, descubriendo que las lealtades personales están atravesadas por la disputa política. Bajo el misterio aparece una investigación energética secreta capaz de alterar el equilibrio de poder dentro del país.',
    outcome: 'El teatro revela las fracturas internas de Snezhnaya y conecta la crisis energética con proyectos que ni siquiera todos los Fatui conocen o controlan.',
  },
  'capitulo-vii-acto-iii': {
    narrative: 'El Viajero finalmente se reúne con la Zarina, quien explica el objetivo con el que ha reunido las Gnosis y nombra la autoridad que pretende ejercer. Para combatir la Maldición de la Muerte de Ronova, Snezhnaya recoge Sellos de Vida de su población, trasladando el coste del plan a toda la nación. La operación atrae a la Gobernante de la Vida y convierte una guerra preparada durante siglos en un enfrentamiento entre leyes fundamentales del mundo.',
    outcome: 'Las Gnosis dejan de ser solo trofeos políticos y pasan a formar parte de una estrategia contra las Sombras, mientras el precio de la rebelión de la Zarina se vuelve público.',
  },
  'capitulo-vii-acto-iv': {
    narrative: 'Los Fatui intentan construir un Engaño más poderoso y los Heraldos descifran un cuaderno dejado por uno de los Pecadores de Khaenri’ah. Al mismo tiempo, la Zarina recibe a la Gobernante de la Vida mientras sus aliados preparan la confrontación con Ronova. La separación deliberada de información —incluso Pierro desconoce partes del plan— muestra que la estrategia depende de sacrificios y contingencias que podrían enfrentarse entre sí.',
    outcome: 'Snezhnaya queda lista para desafiar las reglas de vida y muerte, pero la fragmentación del plan abre la posibilidad de que sus propias herramientas precipiten la catástrofe.',
  },
  'capitulo-vii-acto-v': {
    narrative: 'Un Clavo del Castigo se activa sobre Snezhnaya y a su alrededor avanza un territorio donde la materia se desvanece. La Zarina recurre al Aquelarre para comprender el fenómeno y convoca en el Palacio Zapolyarny a los líderes de todas las naciones. La crisis obliga a antiguos adversarios a compartir información: ya no se trata de decidir si apoyan a los Fatui, sino de responder a una intervención capaz de borrar regiones completas.',
    outcome: 'El conflicto deja de pertenecer a Snezhnaya y se convierte en una emergencia conjunta de Teyvat frente a la autoridad que desciende desde el cielo.',
  },
  'capitulo-vii-acto-vi': {
    narrative: 'Mientras el Suelo Sagrado continúa extendiéndose, el Viajero ayuda a Mondstadt, Inazuma, Sumeru y Natlan a superar sus Pruebas de Usurpación. Cada nación debe responder desde su propia historia y demostrar que puede sostener una autoridad que ya no dependa del orden impuesto. En Snezhnaya, la llegada de un antiguo señor feérico complica la crisis antes de que los representantes reunidos completen la última prueba.',
    outcome: 'Las naciones aceptan una invitación procedente de los cielos y el bloque publicado hasta la versión 7.2 termina con Teyvat actuando como un frente común.',
  },
};
