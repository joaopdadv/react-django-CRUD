# Backend API (Django)

## Requisitos

* **Python 3.12**

## Como rodar

1. Crie e ative o ambiente virtual:

    ```bash
    # Linux / macOS
    python3.12 -m venv venv
    source venv/bin/activate
    ```

    ```powershell
    # Windows (PowerShell)
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    ```

    ```cmd
    :: Windows (Command Prompt)
    python -m venv venv
    .\venv\Scripts\activate
    ```

2. Instale as dependências:

    ```bash
    pip install -r requirements.txt
    ```

3. Aplique as migrações (Banco de Dados):

    ```bash
    python manage.py migrate
    ```

4. Inicie o servidor:

    ```bash
    python manage.py runserver
    ```

5. (Opcional) Para sair do ambiente virtual:

    ```bash
    deactivate
    ```