<template>
<div v-if="!useDefault" v-html="dataProtectionHtml"></div>
<div v-else>
  <h2>
    Datenschutzerklärung
  </h2>
  <p>
    Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir möchten, dass Sie wissen, wann wir welche
    Daten erheben und wie wir sie verwenden. Wir haben technische und organisatorische Maßnahmen getroffen, die
    sicherstellen, dass die Vorschriften über den Datenschutz sowohl von uns als auch von externen Dienstleistern
    beachtet werden. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen. In
    diesen Datenschutzinformationen informieren wir Sie gemäß Artikel 13 und 14 der Datenschutz-Grundverordnung über
    Datenverarbeitung.
  </p>
  <h2>Identität des Verantwortlichen und seiner Vertreterin:</h2>
  <p>
    Präsident des Oberverwaltungsgerichts<br />
    Dr. Lars Brocker<br />
    Deinhardpassage 1<br />
    56068 Koblenz
  </p>
  <p>
    Vizepräsident des Oberverwaltungsgerichts<br />
    Dr. Ulrich Mildner<br />
    Deinhardpassage 1<br />
    56068 Koblenz
  </p>
  <p>
    Diese Verantwortlichkeit beschränkt sich auf die Datenerhebung und -verarbeitung bei Nutzung des
    Akteneinsichtsportals. Wegen des Inhalts der Gerichtsakten und deren Verwaltung wenden Sie sich bitte an das
    zuständige Gericht.
  </p>
  <h2>
    Kontaktdaten des Datenschutzbeauftragten:
  </h2>
  <p>
    Datenschutzbeauftragter für die Verwaltungsgerichtsbarkeit<br />
    Oberverwaltungsgericht Rheinland-Pfalz<br />
    Deinhardpassage 1<br />
    56068 Koblenz
  </p>
  <h2>
    Erhobene Daten und Verarbeitungszwecke
  </h2>
  <p>
    Beim Zugriff auf dieses Internetangebot werden die folgenden Daten in einer Protokolldatei gespeichert:
  </p>
  <ul>
    <li>IP-Adresse</li>
    <li>Datum und Uhrzeit des erfolgten Zugriffs</li>
    <li>aufgerufene Seite bzw. Name der abgerufenen Datei</li>
    <li>Meldung, ob der Zugriff auf die Seite bzw. der Abruf der Datei erfolgreich war</li>
    <li>übertragene Datenmenge</li>
    <li>verwendeter Web-Browser und genutztes Betriebssystem</li>
  </ul>
  <p>
    Die Protokolldatei wird nach 30 Tagen automatisch gelöscht.
  </p>
  <p>
    Die vorgenannten Daten werden ausschließlich zur Sicherstellung eines ordnungsgemäßen Betriebs sowie gegebenenfalls
    auch für statistische Zwecke genutzt. Personenbezogene Nutzungsprofile werden nicht erstellt. Eine Weitergabe an
    Dritte erfolgt nicht. Das Akteneinsichtsportal verwendet keine Techniken, die darauf abzielen, das Zugriffsverhalten
    einzelner Nutzer auszuwerten.
  </p>
  <p>
    Das Akteneinsichtsportal verwendet zudem sogenannte Cookies. Dies sind kleine Textdateien, welche unter Einsatz des
    Browsers am Speicherort des Webseitenbe-suchers abgelegt werden und die Wiedererkennung bei einer Mehrfachnutzung
    ermöglichen. Oftmals handelt es sich lediglich um sog. "Session-Cookies", die nach dem Besuch der Webseite wieder
    gelöscht werden. Cookies dienen der Erhöhung der Benutzerfreundlichkeit und Sicherheit des Akteneinsichtsportals. Ihr
    Einsatz kann in den Browsereinstellungen des Webseitenbesuchers unterbunden werden, allerdings sind als Folge
    Einschränkungen beim Besuch des Akteneinsichtsportals möglich.
  </p>
  <p>
    Die Datenverarbeitung ist zum Zweck der Wahrnehmung der Rechtsprechungsaufgaben der Gerichte erforderlich. Diese
    liegen im öffentlichen Interesse und erfolgen in Ausübung öffentlicher Gewalt (vgl. Artikel 6 Absatz 1 Buchstabe e der
    Datenschutz-Grundverordnung).
  </p>
  <h2>
    Ihre Rechte
  </h2>
  <p>
    Ihnen stehen bei Vorliegen der gesetzlichen Voraussetzungen insbesondere folgende Rechte nach Artikel 13 bis 22 der
    Datenschutz-Grundverordnung zu:
  </p>
  <ul>
    <li>
      das Recht, Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen und unrichtige Daten
      berichtigen oder vervollständigen zu lassen
    </li>
    <li>
      das Recht auf Löschung Ihrer personenbezogenen Daten, sofern die Notwendigkeit der Speicherung nach den oben
      genannten Vorschriften nicht mehr besteht
    </li>
    <li>
      das Recht, unter bestimmten Umständen, insbesondere wenn die Richtigkeit der Daten bestritten ist, die Einschränkung
      der Verarbeitung Ihrer personenbezogenen Daten zu verlangen
    </li>
    <li>
      das Recht, Widerspruch gegen die Verarbeitung personenbezogener Daten einzulegen, sofern diese nicht der
      Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dient.
    </li>
  </ul>
  <h2>
    Beschwerderecht bei der Aufsichtsbehörde
  </h2>
  <p>
    Sollten Sie der Ansicht sein, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre
    datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich nach Artikel 77 der
    Datenschutz-Grundverordnung bei der Aufsichtsbehörde beschweren. In Rheinland-Pfalz ist dies:
  </p>
  <p>
    Der Landesbeauftragte für den Datenschutz<br />
    und die Informationsfreiheit Rheinland-Pfalz<br />
    Postfach 30 40<br />
    55020 Mainz.
  </p>
  <p>
    Dieser ist allerdings <u>nicht</u> für die Aufsicht über die rechtsprechende Tätigkeit von Gerichten und die damit im
    Zusammenhang stehende Datenverarbeitung zuständig.
  </p>
</div>
</template>

<script lang="ts">
import { ref, reactive, Ref, defineComponent } from 'vue'
import { AppOperator } from '../../ressources/model'
import { useStore } from 'vuex';
import State from '../../store/store'

export default defineComponent({
  name: 'Datenschutz',
  props: {
    msg: String
  },
  setup () {
    let config: AppOperator = reactive(<AppOperator>{})
    let dataProtectionHtml: Ref<string> = ref('')

    return { config, dataProtectionHtml }
  },
  computed: {
      useDefault () : boolean {
        return this.config == null ? false : this.config.privacyPolicyUrl === 'default'
      }
  },
  mounted () {
    // this.config = configService.getOperatorConfig();
    // this.stateService.changeState({title: 'Datenschutz'});

    let dsContent = sessionStorage.getItem("dataProtectionContent")
    
    if (Boolean(dsContent)) {
      this.dataProtectionHtml = dsContent;
    } else if (this.config.privacyPolicyUrl !== 'default') {
      fetch(this.config.privacyPolicyUrl)
      .then(response => response.body.getReader().read()
        .then(d => {
          let { value: chunk, done: readerDone } = d;
          let utf8Decoder = new TextDecoder('utf-8');
          let content = chunk ? utf8Decoder.decode(chunk) : '';
          this.dataProtectionHtml = content
          sessionStorage.setItem('dataProtectionContent', content);
        })
      )
    }
  }
})
</script>
