# web-scanner

Automatic scan of the network to find active hosts then look for running wordpress services and find vulnerabilities, the results will be saved in a different folder with the file name following the name of the active wordpress host

## Prerequisites

- Node.js
- `wpscan` & `nmap` installed on your system
- Access to a network for scanning

## Usage Instructions

Follow these steps to use the web scanner:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/web-scanner.git
   cd web-scanner
   chmod +x ./app.sh
   sudo ./app.sh
