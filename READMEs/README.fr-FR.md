<h1 align="center">Understand Anything</h1>

<p align="center">
  <strong>Transformez n'importe quel code source, base de connaissances ou documentation en un graphe de connaissances interactif que vous pouvez explorer, rechercher et interroger.</strong>
  <br />
  <em>Compatible avec Claude Code, Codex, Cursor, Copilot, Gemini CLI, et plus encore.</em>
</p>

<p align="center">
  <a href="https://trendshift.io/repositories/23482" target="_blank"><img src="https://trendshift.io/api/badge/repositories/23482" alt="Lum1104%2FUnderstand-Anything | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</p>

<p align="center">
  <a href="../README.md">English</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.ja-JP.md">日本語</a> | <a href="README.ko-KR.md">한국어</a> | <a href="README.es-ES.md">Español</a> | <a href="README.tr-TR.md">Türkçe</a> | <a href="README.ru-RU.md">Русский</a> | <a href="README.fr-FR.md">Français</a>
</p>

<p align="center">
  <a href="#-démarrage-rapide"><img src="https://img.shields.io/badge/Démarrage_rapide-blue" alt="Démarrage rapide" /></a>
  <a href="https://github.com/Lum1104/Understand-Anything/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow" alt="License: MIT" /></a>
  <a href="https://docs.anthropic.com/en/docs/claude-code"><img src="https://img.shields.io/badge/Claude_Code-8A2BE2" alt="Claude Code" /></a>
  <a href="https://understand-anything.com"><img src="https://img.shields.io/badge/Homepage-d4a574" alt="Homepage" /></a>
  <a href="https://understand-anything.com/demo/"><img src="https://img.shields.io/badge/Démo_en_direct-00c853" alt="Démo en direct" /></a>
</p>

<p align="center">
  <img src="../assets/hero.png" alt="Understand Anything — transformez n'importe quel code en graphe de connaissances interactif" width="800" />
</p>

<p align="center">
  <strong>💬 <a href="https://discord.gg/pydat66RY">Rejoindre la communauté Discord &rarr;</a></strong>
  <br />
  <em>Posez vos questions, partagez ce que vous avez construit, obtenez de l'aide de la communauté.</em>
</p>

---

**Vous venez de rejoindre une nouvelle équipe. La base de code fait 200 000 lignes. Par où commencer ?**

Understand Anything est un [plugin Claude Code](https://code.claude.com/docs/en/plugins-reference#plugins-reference) qui analyse votre projet avec un pipeline multi-agents, construit un graphe de connaissances de chaque fichier, fonction, classe et dépendance, puis vous donne un tableau de bord interactif pour tout explorer visuellement. Arrêtez de lire le code à l'aveugle. Commencez à voir la vue d'ensemble.

> **Le but n'est pas un graphe qui vous impressionne par la complexité de votre code — c'est un graphe qui vous apprend discrètement comment chaque pièce s'imbrique.**

---

## ✨ Fonctionnalités

> [!NOTE]
> **Envie de sauter la lecture ?** Essayez la [démo en direct](https://understand-anything.com/demo/) sur notre [page d'accueil](https://understand-anything.com/) — un tableau de bord entièrement interactif que vous pouvez déplacer, zoomer, parcourir et explorer directement dans votre navigateur.

### Explorer le graphe structurel

Naviguez dans votre base de code comme un graphe de connaissances interactif — chaque fichier, fonction et classe est un nœud sur lequel vous pouvez cliquer, chercher et explorer. Sélectionnez n'importe quel nœud pour voir des résumés en clair, des relations et des visites guidées.

### Comprendre la logique métier

Basculez sur la vue domaine et voyez comment votre code correspond à de vrais processus métier — domaines, flux et étapes disposés en graphe horizontal.

### Analyser les bases de connaissances

Pointez `/understand-knowledge` vers un [wiki LLM façon Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) et obtenez un graphe de connaissances « force-directed » avec regroupement par communautés. Le parseur déterministe extrait les wikilinks et les catégories depuis `index.md`, puis des agents LLM découvrent les relations implicites, extraient les entités et font émerger les affirmations — transformant votre wiki en un graphe navigable d'idées interconnectées.

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🧭 Visites guidées</h3>
      <p>Parcours auto-générés de l'architecture, ordonnés par dépendance. Apprenez la base de code dans le bon ordre.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🔍 Recherche floue et sémantique</h3>
      <p>Trouvez tout par nom ou par sens. Cherchez « quelles parties gèrent l'authentification ? » et obtenez des résultats pertinents dans tout le graphe.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📊 Analyse d'impact des diffs</h3>
      <p>Voyez quelles parties du système vos changements affectent avant de committer. Comprenez les effets en cascade.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🎭 Interface adaptée au profil</h3>
      <p>Le tableau de bord ajuste son niveau de détail selon qui vous êtes — développeur junior, chef de produit ou utilisateur avancé.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🏗️ Visualisation par couches</h3>
      <p>Regroupement automatique par couche d'architecture — API, Service, Données, UI, Utilitaire — avec légende colorée.</p>
    </td>
    <td width="50%" valign="top">
      <h3>📚 Concepts de langage</h3>
      <p>12 patterns de programmation (génériques, closures, décorateurs, etc.) expliqués en contexte, là où ils apparaissent.</p>
    </td>
  </tr>
</table>

---

## 🚀 Démarrage rapide

### 1. Installer le plugin

```bash
/plugin marketplace add Lum1104/Understand-Anything
/plugin install understand-anything
```

### 2. Analyser votre base de code

```bash
/understand
```

Un pipeline multi-agents scanne votre projet, extrait chaque fichier, fonction, classe et dépendance, puis construit un graphe de connaissances enregistré dans `.understand-anything/knowledge-graph.json`.

**Sortie localisée :** utilisez `--language` pour générer le contenu dans la langue de votre choix :

```bash
# Générer le contenu en français (descriptions des nœuds + interface du tableau de bord)
/understand --language fr

# Langues prises en charge : en (défaut), fr, zh, zh-TW, ja, ko, ru
```

Le paramètre `--language` affecte :
- Les résumés et descriptions des nœuds dans le graphe de connaissances
- Les libellés, boutons et infobulles de l'interface du tableau de bord
- Les explications des visites guidées

### 3. Explorer le tableau de bord

```bash
/understand-dashboard
```

Un tableau de bord web interactif s'ouvre avec votre base de code visualisée comme un graphe — coloré par couche d'architecture, recherchable et cliquable. Sélectionnez n'importe quel nœud pour voir son code, ses relations et une explication en clair.

### 4. Continuer à apprendre

```bash
# Posez n'importe quelle question sur la base de code
/understand-chat Comment fonctionne le flux de paiement ?

# Analysez l'impact de vos changements en cours
/understand-diff

# Explorez en profondeur un fichier ou une fonction
/understand-explain src/auth/login.ts

# Générez un guide d'intégration pour les nouveaux membres de l'équipe
/understand-onboard

# Extrayez les connaissances métier (domaines, flux, étapes)
/understand-domain

# Analysez une base de connaissances type wiki LLM façon Karpathy
/understand-knowledge ~/chemin/vers/wiki

# Relancez quand vous voulez — incrémental par défaut (ne réanalyse que les fichiers modifiés)
/understand

# Mise à jour automatique à chaque commit via un hook post-commit
/understand --auto-update

# Limitez à un sous-dossier (pour les gros monorepos)
/understand src/frontend
```

---

## 🌐 Installation multi-plateforme

Understand-Anything fonctionne sur plusieurs plateformes de codage IA.

### Claude Code (natif)

```bash
/plugin marketplace add Lum1104/Understand-Anything
/plugin install understand-anything
```

### Installation en une ligne (Codex / OpenCode / OpenClaw / Antigravity / Gemini CLI / Pi Agent / Vibe CLI / VS Code Copilot / Hermes / Cline / KIMI CLI / Trae)

**macOS / Linux :**
```bash
curl -fsSL https://raw.githubusercontent.com/Lum1104/Understand-Anything/main/install.sh | bash
# ou sautez l'invite en passant la plateforme :
curl -fsSL https://raw.githubusercontent.com/Lum1104/Understand-Anything/main/install.sh | bash -s codex
```

**Windows (PowerShell) :**
```powershell
iwr -useb https://raw.githubusercontent.com/Lum1104/Understand-Anything/main/install.ps1 | iex
```

L'installeur clone le dépôt dans `~/.understand-anything/repo` et crée les liens symboliques adaptés à la plateforme choisie. Redémarrez votre CLI/IDE ensuite.

- Valeurs `<platform>` prises en charge : `gemini`, `codex`, `opencode`, `pi`, `openclaw`, `antigravity`, `vibe`, `vscode`, `hermes`, `cline`, `kimi`, `trae`
- Mettre à jour plus tard : `./install.sh --update`
- Désinstaller : `./install.sh --uninstall <platform>`

### Cursor

Cursor découvre automatiquement le plugin via `.cursor-plugin/plugin.json` quand ce dépôt est cloné. Aucune installation manuelle nécessaire — clonez et ouvrez dans Cursor.

Si la découverte automatique échoue, installez-le manuellement : ouvrez **Cursor Settings → Plugins**, collez `https://github.com/Lum1104/Understand-Anything` dans le champ de recherche et ajoutez-le.

### VS Code + GitHub Copilot

VS Code avec GitHub Copilot (v1.108+) découvre automatiquement le plugin via `.copilot-plugin/plugin.json` quand ce dépôt est cloné. Aucune installation manuelle nécessaire.

Pour des skills personnels (disponibles dans tous les projets), exécutez le `install.sh` ci-dessus avec la plateforme `vscode`.

### Copilot CLI

```bash
copilot plugin install Lum1104/Understand-Anything:understand-anything-plugin
```

### Compatibilité des plateformes

| Plateforme | Statut | Méthode d'installation |
|------------|--------|------------------------|
| Claude Code | ✅ Natif | Marketplace de plugins |
| Cursor | ✅ Pris en charge | Découverte automatique |
| VS Code + GitHub Copilot | ✅ Pris en charge | Découverte automatique |
| Copilot CLI | ✅ Pris en charge | Installation de plugin |
| Codex | ✅ Pris en charge | `install.sh codex` |
| OpenCode | ✅ Pris en charge | `install.sh opencode` |
| OpenClaw | ✅ Pris en charge | `install.sh openclaw` |
| Antigravity | ✅ Pris en charge | `install.sh antigravity` |
| Gemini CLI | ✅ Pris en charge | `install.sh gemini` |
| Pi Agent | ✅ Pris en charge | `install.sh pi` |
| Vibe CLI | ✅ Pris en charge | `install.sh vibe` |
| Hermes | ✅ Pris en charge | `install.sh hermes` |
| Cline | ✅ Pris en charge | `install.sh cline` |
| KIMI CLI | ✅ Pris en charge | `install.sh kimi` |
| Trae | ✅ Pris en charge | `install.sh trae` |

---

## 📦 Partager le graphe avec votre équipe

Le graphe n'est que du JSON — **committez-le une fois, et vos collègues sautent le pipeline**. Idéal pour l'intégration, les revues de PR et la doc-as-code.

> **Exemple :** [GoogleCloudPlatform/microservices-demo (fork)](https://github.com/Lum1104/microservices-demo) — référence Go / Java / Python / Node avec un graphe committé.

**Quoi committer :** tout ce qui est dans `.understand-anything/` *sauf* `intermediate/` et `diff-overlay.json` (ce sont des fichiers de travail locaux).

```gitignore
.understand-anything/intermediate/
.understand-anything/diff-overlay.json
```

**Gardez-le à jour :** activez `/understand --auto-update` — un hook post-commit corrige le graphe de manière incrémentale pour que chaque commit arrive avec un graphe à jour. Ou relancez `/understand` manuellement avant les releases.

**Gros graphes (10 Mo+) :** suivez-les avec **git-lfs**.

```bash
git lfs install
git lfs track ".understand-anything/*.json"
git add .gitattributes .understand-anything/
```

---

## 🔧 Sous le capot

### Hybride Tree-sitter + LLM

L'analyse statique et les LLM font chacun ce qu'ils font de mieux :

- **Tree-sitter (déterministe)** — parse le source en arbre syntaxique concret et extrait les faits structurels : imports, exports, définitions de fonctions/classes, points d'appel, héritage. Pré-résolu en `importMap` pendant la phase de scan et passé aux analyseurs de fichiers pour qu'ils ne re-dérivent pas les imports depuis le source. Même entrée → même sortie, à chaque exécution. Alimente aussi la détection de changements par empreinte pour les mises à jour incrémentales.
- **LLM (sémantique)** — lit la structure parsée avec le source original pour produire ce que les parseurs ne peuvent pas : résumés en clair, étiquettes, affectation des couches d'architecture, cartographie du domaine métier, visites guidées, explications de concepts de langage.

Cette séparation explique pourquoi le graphe est reproductible côté structure (le même code donne toujours les mêmes arêtes) tout en capturant l'intention côté sémantique (à quoi sert un fichier, pas seulement ce qu'il importe).

### Pipeline multi-agents

La commande `/understand` orchestre 5 agents spécialisés, et `/understand-domain` en ajoute un 6e :

| Agent | Rôle |
|-------|------|
| `project-scanner` | Découvrir les fichiers, détecter langages et frameworks |
| `file-analyzer` | Extraire fonctions, classes, imports ; produire nœuds et arêtes du graphe |
| `architecture-analyzer` | Identifier les couches d'architecture |
| `tour-builder` | Générer les visites guidées d'apprentissage |
| `graph-reviewer` | Valider la complétude et l'intégrité référentielle du graphe (en ligne par défaut ; `--review` pour une revue LLM complète) |
| `domain-analyzer` | Extraire domaines métier, flux et étapes de processus (utilisé par `/understand-domain`) |
| `article-analyzer` | Extraire entités, affirmations et relations implicites des articles de wiki (utilisé par `/understand-knowledge`) |

Les analyseurs de fichiers tournent en parallèle (jusqu'à 5 simultanés, 20-30 fichiers par lot). Prend en charge les mises à jour incrémentales — ne réanalyse que les fichiers modifiés depuis la dernière exécution.

---

## 🎥 Communauté

Une présentation réalisée par la communauté, par **Better Stack**.

<p align="center">
  <a href="https://www.youtube.com/watch?v=VmIUXVlt7_I"><img src="https://img.youtube.com/vi/VmIUXVlt7_I/maxresdefault.jpg" alt="Présentation communautaire par Better Stack — à voir sur YouTube" width="480" /></a>
  <br />
  <em><a href="https://www.youtube.com/watch?v=VmIUXVlt7_I">Voir sur YouTube &rarr;</a></em>
</p>

Vous avez fait une vidéo, un article de blog ou un tutoriel ? Ouvrez une issue ou une PR — avec plaisir pour le mettre en avant ici.

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment démarrer :

1. Forkez le dépôt
2. Créez une branche de fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Lancez les tests (`pnpm --filter @understand-anything/core test`)
4. Committez vos changements et ouvrez une pull request

Veuillez ouvrir une issue d'abord pour les changements majeurs afin que nous puissions discuter de l'approche.

---

<p align="center">
  <strong>Arrêtez de lire le code à l'aveugle. Commencez à tout comprendre.</strong>
</p>

<p align="center">
  Licence MIT &copy; <a href="https://github.com/Lum1104">Lum1104</a>
</p>
