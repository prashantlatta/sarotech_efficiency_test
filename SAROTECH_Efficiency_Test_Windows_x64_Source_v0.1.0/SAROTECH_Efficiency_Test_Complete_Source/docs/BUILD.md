# Build and release

Extract the ZIP and upload its contents (not the enclosing folder) to the root of the empty GitHub repository. Commit to `main`.

The GitHub Actions workflow builds on `windows-latest` for x86_64 and uploads NSIS `.exe` and MSI `.msi` installers as the `SAROTECH-Windows-x64-Installers` artifact.

After a successful run: open the repository's Actions tab, select the run named `Build Windows x64 installers`, then download its artifact.

Tauri Windows applications use Microsoft WebView2. On machines where the runtime is missing, the installer may need internet access to install it.

This v0.1.0 is a buildable foundation with navigable UI, timers, typing demo and 90 original exercise prompts. DOCX/XLSX editing, verified exam-specific automatic scoring and full exam-rule profiles are not implemented yet.
